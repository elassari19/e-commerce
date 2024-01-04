import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { uploadImages } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { auth } from "@/lib/getAuthSession";

export async function POST(req: Request, res: NextApiResponse) {
  const data = await req.json();
  const userId = await auth("id")
  // grab product category
  const category = data.categoryId
  delete data.categoryId
  // console.log("data", data)

  try { // awiat uploading images to cloudinary cloud
    data.images = await uploadImages(data.images)
  } catch (error) {
    return NextResponse.json({
      error
    }, { status: 400 })
  }

  const response = await db.product.create({
    data: {
      ...data,
      slug: data?.name?.toLowerCase().replace(" ", "_"),
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
