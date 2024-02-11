import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { uploadImages, deleteImages } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { auth } from "@/lib/getAuthSession";
import { TColorForm, TImage, TImageColors } from "@/types/products";

interface ExtendsRequest extends Request, Pick<NextApiRequest, "query">{
  response: any
  images: FileList | null | unknown
  colors: TImageColors[]
}

// export async function POST(req: ExtendsRequest, res: NextApiResponse) {
//   const data = await req.json();
//   const userId = await auth("id")
//   data.slug = data.name.toLowerCase().replace(/\s/g, "-")

//   // grab product category
//   // const category = data.categoryId
//   delete data.categoryId
//   data.quantity = data.colors.reduce((acc: number, item: TColorForm) => acc + item.quantity, 0).toString()
// // console.log("category", category)
  
//   // awiat uploading images to cloudinary cloud
//   try {
//     data.images = await uploadImages(data.images.map((fl: TImage) => fl.file), `products/${data.slug}`)

//     // @ts-ignore await uploading images based on colors to cloudinary cloud
//     const colors: TImageColors[] = await uploadImages(data.colors.map((fl: TImage) => fl.file), `products/${data.slug}/colors`)

//     // map images with colors
//     req.colors = data.colors.map((item: TImageColors, index: number) => {
//       return ({
//         quantity: item.quantity.toString(),
//         color: item.color,
//         secure_url: colors[index].secure_url,
//         public_id: colors[index].public_id
//       })
//     })

//     delete data.colors
//   } catch (error) {
//     return NextResponse.json({
//       error
//     }, { status: 400 })
//   }

//   // create product
//   try {
//     const response = await db.product.create({
//     data: {
//       ...data,
//       User: {
//         connect: { id: userId }
//       },
//       // Category: {
//       //   connect: { id: category }
//       // },
//       properties: {
//         create: [
//           ...data.properties,
//         ],
//       },
//       images: {
//         create: [
//           ...data.images,
//           ...req.colors
//         ],
//       }
//     }
//   })
//   res.redirect(307, '/')
//   return NextResponse.json({
//     response
//   }, { status: 201 })
//   } catch (error) {
//     return NextResponse.json({
//       error
//     }, { status: 401 })
  
//   }
  
// }

export async function GET(req: ExtendsRequest) {
  const { productId } = req.query;

  try {
    req.response = await db.product.findFirst({
      where: { id: productId as string },
      include: { images: true }
    })
    return NextResponse.json({
      product: req.response
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function PATCH(req: ExtendsRequest) {
  const { productId } = req.query;
  const data = await req.json();

  // grab product images...
  const products = await db.product.findFirst({
    where: { id: productId as string },
    include: { images: true, properties: true }
  })

  try { // delete product images folder from cloudinary
    if (products?.images) await deleteImages(products.images)
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  try {
    req.response = await db.product.update({
      where: { id: productId as string},
      data: { [data.name]: data.value }
    })
    return NextResponse.json({ product: req.response }, { status: 202 })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function DELETE(req: ExtendsRequest) {
  const { productId } = req.query;

  // grab product images...
  const products = await db.product.findFirst({
    where: { id: productId as string },
    include: { images: true }
  })

  try { // delete images from cloudinary
    if (products?.images) await deleteImages(products.images)
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
  const response = await db.product.delete({ where: { id: productId as string } })

  return NextResponse.json({ product: response }, { status: 202 })
}
