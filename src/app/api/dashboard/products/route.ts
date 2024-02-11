import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { uploadImages, deleteImages } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { auth } from "@/lib/getAuthSession";
import { TColorForm, TImage, TImageColors } from "@/types/products";

interface ExtendsRequest extends Request, Pick<NextApiRequest, "query"> {
  response: any
  images: FileList | null | unknown
  colors: TImageColors[]
}

export async function POST(req: ExtendsRequest, res: NextApiResponse) {
  const data = await req.json();
  const userId = await auth("id")
  data.slug = data.name.toLowerCase().replace(/\s/g, "-")

  data.quantity = data.colors.reduce((acc: number, item: TColorForm) => Number(acc) + Number(item.quantity), 0).toString()
  console.log("create.data", data)
  
  try {
    // awiat uploading images to cloudinary cloud
    data.images = await uploadImages(data.images.map((fl: TImage) => fl.file), `products/${data.slug}`)

    // @ts-ignore await uploading images based on colors to cloudinary cloud
    const colors: TImageColors[] = await uploadImages(data.colors.map((fl: TImageColors) => fl.file), `products/${data.slug}/colors`)

    // map images with colors
    req.colors = data.colors.map((item: TImageColors, index: number) => {
      return ({
        quantity: item.quantity.toString(),
        color: item.color,
        secure_url: colors[index].secure_url,
        public_id: colors[index].public_id
      })
    })

    delete data.colors
  } catch (error) {
    return NextResponse.json({
      error
    }, { status: 400 })
  }
  // console.log("create.data", data, req.colors)

  try {
    // create product
    const response = await db.product.create({
      data: {
        ...data,
        User: { connect: { id: userId } },
        Category: { connect: { id: data.categoryId } },
        properties: {
          create: [ ...data.properties ],
        },
        images: {
          create: [ ...data.images, ...req.colors ],
        }
      }
    })
    res.redirect(307, '/')
    return NextResponse.json({
    response
  }, { status: 201 })
  } catch (error) {
    return NextResponse.json({
      error
    }, { status: 401 })
  }
}

export async function GET(req: Request) {
  const data = await req.json();

  data.response = await db.product.findMany()

  return NextResponse.json({
    product: data.response
  }, { status: 200 })
}

export async function PATCH(req: ExtendsRequest) {
  const data = await req.json();
  console.log(data)

  try {
    req.response = await db.product.update({
      where: { id: data.id },
      data: { [data.name]: data.value }
    })
    return NextResponse.json({ product: req.response }, { status: 202 })

  } catch (error) {
    return NextResponse.json({ error })
  }
}

export async function DELETE(req: Request) {
  const data = await req.json();

  // grab product images...
  const products = await db.product.findMany({
    where: { id: { in: data } },
    include: { images: true }
  })

  try { // delete images from cloudinary
    products.map(async (prod) => prod.images && await deleteImages(prod.images))
    // const remove = await deleteImages(prod.images)
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
  const response = await db.product.deleteMany({ where: { id: { in: data } } })

  return NextResponse.json({ product: response }, { status: 202 })
}

