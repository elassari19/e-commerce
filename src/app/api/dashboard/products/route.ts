import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { uploadImages, deleteImages } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { auth } from "@/lib/getAuthSession";

interface ExtendsRequest extends Request {
  response: any
}

export async function POST(req: Request, res: NextApiResponse) {
  const data = await req.json();
  const userId = await auth("id")

  // grab product category
  const category = data.categoryId
  delete data.categoryId
  // console.log("data", data)

  try { // awiat uploading images to cloudinary cloud
    data.images = await uploadImages(data.images, "products")
  } catch (error) {
    return NextResponse.json({
      error
    }, { status: 400 })
  }

  const response = await db.product.create({
    data: {
      ...data,
      slug: data?.name?.toLowerCase().replace(" ", "_").replace("&", "and"),
      User: {
        connect: { id: userId }
      },
      Category: {
        connect: { id: category }
      },
      properties: {
        create: [
          ...data.properties,
        ],
      },
      images: {
        create: [
          ...data.images,
        ],
      }
    }
  })

  return NextResponse.json({
    response
  }, { status: 201 })
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
    products.map(async (prod) => {
      const remove = await deleteImages(prod.images)
    })
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
  const response = await db.product.deleteMany({ where: { id: { in: data } } })

  return NextResponse.json({ product: response }, { status: 202 })
}
