import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/getAuthSession";

interface ExtendsRequest extends Request {
  response: any
}

export async function POST(req: Request, res: NextApiResponse) {
  const data = await req.json();
  const userId = await auth("id")

  const response = await db.category.create({
    data: {
      ...data,
      slug: data?.name?.toLowerCase().replace(" ", "_").replace("&", "and"),
      User: {
        connect: { id: userId }
      },
    }
  })

  return NextResponse.json({ category:  response }, { status: 201 })
}

export async function GET(req: Request) {
  const data = await req.json();

  if(data?.id) {
    data.response = await db.category.findFirst({
      where: { OR: [ {id: data?.id}, {name: data?.name} ] },
    },)
  
  } else {
    data.response = await db.category.findMany()
  }

  return NextResponse.json({
    categories: data.response
  }, { status: 200 })
}

export async function PATCH(req: ExtendsRequest) {
  const data = await req.json();
  const id = data.id
  delete data.id

  try {
    req.response = await db.category.update({ where: { id }, data },)
    return NextResponse.json({ categories: req.response }, { status: 202 })

  } catch (error) {
    return NextResponse.json({ error })
  }
}

export async function DELETE(req: Request) {
  const data = await req.json();
  const response = await db.category.deleteMany({ where: { id: { in: data } } })

  return NextResponse.json({ categories: response }, { status: 202 })
}
