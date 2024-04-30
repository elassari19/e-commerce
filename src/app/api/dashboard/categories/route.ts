import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { deleteImages, uploadImages } from "@/lib/cloudinary";
import { auth } from "@/lib/getAuthSession";

interface ExtendsRequest extends Request, NextRequest {
  response: any
}

export async function POST(req: ExtendsRequest, res: NextApiResponse) {
  const data = await req.json();
  const userId = data.userId || await auth("id")
  delete data.userId

  data.slug = data.name.toLowerCase().replace(" ", "_").replace("&", "and")
  console.log("data", data.parentId)
  try {
    // awiat uploading root images to cloudinary cloud
    data.images = await uploadImages(data.images.map((img: any) => img.file), `categoy/${data.slug}`)
  } catch (error) {
    return NextResponse.json({
      error
    }, { status: 400 })
  }

  const response = await db.category.create({
    data: {
      ...data,
      User: { connect: { id: userId } },
      images: {
        create: [ ...data.images ],
      }
    }
})

  return NextResponse.json({ category:  response }, { status: 201 })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const page = +(searchParams.get("page") ?? 0)
  const take = +(searchParams.get("take") ?? 20)

  const data = await db.$transaction([
    db.category.count(),
    db.category.findMany({
      skip: take * page,
      take: take,
      include: {
        _count: true
      }
    })
  ])

  return NextResponse.json({
    categories: data
  }, { status: 200 })
}

export async function PATCH(req: ExtendsRequest) {
  const data = await req.json();
  delete data.images

  try {
    req.response = await db.category.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        parentId: data.parentId,
      }
    })
    return NextResponse.json({ categories: req.response }, { status: 202 })

  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}

export async function DELETE(req: ExtendsRequest) {
  const data = await req.json();

  const categories = await db.category.findMany({
    where: { id: { in: data } },
    include: { images: true }
  })

  try { // delete images from cloudinary
    categories.map(async (category) => category.images && await deleteImages(category.images))
    // const remove = await deleteImages(prod.images)
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  const response = await db.category.deleteMany({ where: { id: { in: data } } })

  return NextResponse.json({ categories: response }, { status: 202 })
}
