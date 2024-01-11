import { NextResponse } from "next/server";
import { registerSchema } from "@/schema/userSchema";
import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextApiResponse } from "next";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const body = await req.json();
    const { code, email, password } = registerSchema.parse(body);

    // email already exists
    const user = await db.user.findUnique({
      where: { email: email }
    })
    if(user?.email)
     return NextResponse.json({ message: "Account alredy exists" }, { status: 409 })

    // encrypt password
    const hashPassword = await hash(password, 12);

    // create new account
    const createNewUser = await db.user.create({
      data: {
        email,
        password: hashPassword,
        role: "user"
      }
    });

    // create new accoutn succeeded
    if(createNewUser?.id)
      return NextResponse.json({
        user: { ...createNewUser, password: null },
        message: "Create account succeeded"
      }, { status: 201 })

  } catch (error: any) {
    // data not valid
    if(error.name === "ZodError") return NextResponse.json({
      message: error.issues
    }, { status: 422 })

    // something wrong
    return NextResponse.json({
      message: error
    }, { status: 500 })
  }
}
