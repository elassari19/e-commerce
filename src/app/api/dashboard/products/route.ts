import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { uploadImages } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { auth } from "@/lib/getAuthSession";

export async function POST(req: Request, res: NextApiResponse) {
  const data = await req.json();
  const userId = await auth("id")
  const props = data.properties
  delete data.properties

  try { // awiat uploading images to cloudinary cloud
    await uploadImages(data.images)
    delete data.images
  } catch (error) {
    return NextResponse.json({
      error
    }, { status: 400 })
  }

  const response = await db.product.create({
    data: {
      ...data,
      slug: data?.name?.toLowerCase().replace(" ", "_"),
      createdBy: userId
    }
  })
  // .then(async res => {
  //   await db.properties.create({
  //     data: {
  //       ...props,
  //       productId: res.id
  //     }
  //   })
  //   await db.imageUrl.create({
  //     data: {
  //       ...data.images,
  //       productId: res.id,
  //       createdBy: userId
  //     }
  //   })
  // }).catch(error => {
  //   return NextResponse.json({
  //     error
  //   }, { status: 400 })
  // })

  // if(response?.id) {
  //   await db.properties.create({
  //     data: props,
  //     productId: response.id
  //   })
  //   await db.imageUrl.create({
  //     data: {
  //       ...data.images,
  //       productId: response.id,
  //       createdBy: userId
  //     }
  //   })
  // }

  return NextResponse.json({
    response
  }, { status: 201 })
}
