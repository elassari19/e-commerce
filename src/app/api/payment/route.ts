import { auth, getAuthSession } from "@/lib/getAuthSession";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { IProductData } from "@/types/products";

export async function POST(req: NextRequest, res: NextResponse) {
  const email = await auth('email')
  const session = await getAuthSession();
  const body = await req.json();

  const line_items = body.map((item: IProductData&{qty: number}) => ({
    quantity: item.qty,
    price_data: {
      currency: "usd",
      unit_amount: item.price,
      product_data: {
        name: item.name,
        description: item.description,
        images: [item.images[0].secure_url],
      },
    },
  }))

  if (!session) {
    return NextResponse.json({message: 'Unauthorized'},{ status: 401});
  }

  try {
    const event = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/orders`,
      cancel_url: `${req.headers.get('origin')}/checkout`,
      metadata: { email }
    });

     return NextResponse.json({ id: event.id }, { status: 200});
  } catch (error: any) {
    console.log('error', error?.message)
    return NextResponse.json({message: 'Event Error'},{ status: 500});
  }
}