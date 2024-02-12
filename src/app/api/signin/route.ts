import { NextResponse } from "next/server";
import { signinSchema } from "@/schema/userSchema";
import { db } from "@/lib/db";
import { compare } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = signinSchema.parse(body);

    // email already exists
    const user = await db.user.findUnique({
      where: { email: email }
    })
    if(!user?.email) return NextResponse.json({ status: 404, message: "Account not exists" })

    // encrypt password
    const hashPassword = await compare(password, user.password!);
    if(!hashPassword) return NextResponse.json({ status: 401, message: "Email or Password not correct" })

  } catch (error: any) {

    // data not valid
    if(error.name === "ZodError") return NextResponse.json({
      status: 402,
      message: error.issues
    })

    // something wrong
    return NextResponse.json({
      status: 500,
      message: error
    })
  }
}
