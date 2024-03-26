import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { uploadImages, deleteImages } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { auth } from "@/lib/getAuthSession";
import { TColorForm, TImage, TImageColors } from "@/types/products";

interface ExtendsRequest extends Request, Pick<NextApiRequest, "query"> {
  response: any
  images: FileList | null | unknown
  colors: TImage[]
  properties: TImageColors[]
}

export async function POST(req: ExtendsRequest, res: NextApiResponse) {
  const data = await req.json();
  const userId = data.userId
  delete data.userId
  const categoryId = data.categoryId
  delete data.categoryId
  data.slug = data.name.toLowerCase().replace(/\s/g, "-")

  try {
    // awiat uploading root images to cloudinary cloud
    data.images = await uploadImages(data.images, `products/${data.slug}`)

    // @ts-ignore await uploading product color images to cloudinary cloud
    const images = data.properties.map((fl: TImageColors) => fl.file).filter((fl: TImageColors) => fl && fl)
    req.colors = await uploadImages(images, `products/${data.slug}/colors`) as TImage[]

    // map images with colors
    req.properties = data.properties.map((item: TImageColors, index: number) => {
      delete item.file;
      delete item.secure_url;
      return item
    })
  } catch (error) {
    return NextResponse.json({
      error
    }, { status: 400 })
  }

  try {
    // create product
    const response = await db.product.create({
      data: {
        ...data,
        User: { connect: { id: userId } },
        Category: { connect: { id: categoryId } },
        properties: {
          create: [ ...data.properties ],
        },
        images: {
          create: [ ...data.images, ...req.colors ],
        }
      }
    })
    // res.redirect(307, '/')
    return NextResponse.json({
    response
  }, { status: 201 })
  } catch (error) {
    console.log("error", error)
    return NextResponse.json({
      error
    }, { status: 402 })
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
      data: {
        name: data.name,
        description: data.description,
        slug: data.name.toLowerCase().replace(/\s/g, "-"),
        price: data.price,
        quantity: data.quantity,
        Category: { connect: { id: data.categoryId }},
        // images: {
        //   create: data.images
        // },
        // properties: {
        //   create: data.properties
        // },
      }
    })
    return NextResponse.json({ product: req.response }, { status: 202 })

  } catch (error) {
    console.log("error", error)
    return NextResponse.json({ error }, { status: 400 })
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

