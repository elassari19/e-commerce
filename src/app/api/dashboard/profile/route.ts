import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { uploadImages, deleteImages } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { auth } from "@/lib/getAuthSession";
import { hash } from "bcryptjs";

interface ExtendsRequest extends Request {
  response: any
}

export async function POST(req: Request, res: NextApiResponse) {
  const data = await req.json();
  const userId = await auth("id")

  if(!userId) return NextResponse.json(
    { res: "somthing wrong" },{ status: 404 }
  )

  try { // awiat uploading images to cloudinary cloud
    data.image = await uploadImages(data.image, "users")
  } catch (error) {
    return NextResponse.json({
      error
    }, { status: 400 })
  }

  const hashPassword = await hash(data.password, 12)

  const response = await db.user.create({
    data: {
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      age: data.age,
      email: data.email,
      password: hashPassword,
      phone: data.phone,
      birthDate: new Date(data.birthDate),
      address: {
        create:
          {
            address: data.address,
            city: data.citey,
            lat: data.lat,
            lng: data.lng,
            postalCode: data.postalCode,
          }
      },
      bank: {
        create:
          {
            cardName: data.cardName,
            cardExpire: data.cardExpire,
            cardNumber: data.cardNumber,
            cardType: data.cardType,
            currency: data.currency,
            iban: data.iban
          }
      },
      image: {
        create: [
          ...data.image,
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

  data.response = await db.user.findMany()

  return NextResponse.json({
    user: data.response
  }, { status: 200 })
}

export async function PATCH(req: ExtendsRequest) {
  const data = await req.json();
  // console.log(data)

  const hashPassword = hash(data.value, 12)

  try {
    req.response = await db.user.update({
      where: { id: data.id },
      data: {
        [data.name]: data.name[0] === "password"
          ? hashPassword
          : data.value
      }
    })
    return NextResponse.json({ user: req.response }, { status: 202 })

  } catch (error) {
    return NextResponse.json({ error }, { status: 402 })
  }
}

export async function DELETE(req: Request) {
  const data = await req.json();

  console.log(data)
  // grab product images...
  const users = await db.user.findMany({
    where: { id: { in: data } },
    include: { image: true }
  })

  try { // delete images from cloudinary
    users.map(async (user) => {
      await deleteImages(user.image)
    })
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
  const response = await db.user.deleteMany({ where: { id: { in: data } } })

  return NextResponse.json({ users: response }, { status: 202 })
}
