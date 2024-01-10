import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { uploadImages, deleteImages } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { auth } from "@/lib/getAuthSession";
import * as jwt from "jsonwebtoken"

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
    data.image = await uploadImages(data.image)
  } catch (error) {
    return NextResponse.json({
      error
    }, { status: 400 })
  }

  const response = await db.user.create({
    data: {
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      age: data.age,
      email: data.email,
      password: jwt.sign(data.password, process.env.NEXTAUTH_SECRET!),
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
