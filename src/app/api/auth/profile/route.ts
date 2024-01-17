import { NextApiResponse } from "next";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface ExtendsRequest extends Request {
  response: any
}

export async function POST(req: ExtendsRequest, res: NextApiResponse) {
  const data = await req.json();

  console.log(data)

  const userExist = await db.user.findUnique({
    where: { email: data.email }
  })

  if(userExist) {
    return NextResponse.json({ response: "Email already exist" }, { status: 401 })
  }
  // req.response = await db.user.create({
  //   data: {
  //     ...data,
  //     firstName: data?.given_name,
  //     lastName: data?.family_name,
  //     image: data.picture,
  //     account: {
  //       create: {
  //         ...data.account
  //       },
  //       Sesstion: {
  //         ...data.account.session
  //       }
  //     }
  //   }
  // })

  return NextResponse.json({ category:  "req.response" }, { status: 201 })
}