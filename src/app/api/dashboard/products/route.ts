import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { uploadImages, deleteImages, deleteFolder } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { auth } from "@/lib/getAuthSession";
import { TImage, TImageColors } from "@/types/products";

interface ExtendsRequest extends Request, Pick<NextApiRequest, "query"> {
  response: any
  images: FileList | null | unknown
  colors: TImage[]
  properties: TImageColors[]
}

export async function POST(req: ExtendsRequest, res: NextApiResponse) {
  const data = await req.json();
  const userId = await auth("id")
  // console.log("userId", userId)

  const categoryId = data.categoryId
  delete data.categoryId
  data.slug = data.name.toLowerCase().replace(/\s/g, "-")

  try {
    // awiat uploading root images to cloudinary cloud
    data.images = await uploadImages(data.images.map((img: any) => img.file), `products/${data.slug}`)
    console.log("upload images done")
  } catch (error) {
    console.log("images error", error)
  }
  try {
    const properties: any = []
    let result: Pick<TImageColors, "public_id"|"secure_url">[]
    for(let i=0; i < data.properties.length; i++) {
      if(data.properties[i].color !== undefined) {
        result = await uploadImages([data.properties[i].file], `products/${data.slug}/colors`)

        delete data.properties[i].file
        data.properties[i].public_id = result[0].public_id
        data.properties[i].secure_url = result[0].secure_url
        properties.push(data.properties[i])
      } else {
        properties.push(data.properties[i])
      }
    }
    data.properties = properties
  } catch (error) {
    console.log("color images error")
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
          create: [ ...data.images ],
        }
      }
    })
    return NextResponse.json({
      response
  }, { status: 201 })
  } catch (error) {
    console.log("post error", error)
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
    products.map(async (prod) => {
      prod.images && await deleteImages(prod.images)
      await deleteFolder(`${prod.slug}`)
    })
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
  const response = await db.product.deleteMany({ where: { id: { in: data } } })

  return NextResponse.json({ product: response }, { status: 202 })
}

