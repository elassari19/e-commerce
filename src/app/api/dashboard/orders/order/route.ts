import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/getAuthSession';

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();
  const userId = await auth('id');
  console.log('body', body, userId);

  const quantity = body.products.reduce(
    (acc: any, item: any) => acc + item.qty,
    0
  );
  const price = body.products.reduce(
    (acc: any, item: any) => acc + item.qty * item.price,
    0
  );

  try {
    const orderRes = await db.orders.create({
      data: {
        userId,
        quantity,
        price,
        tax: price * 0.2,
        shipping: price * 0.1,
        isPaid: body.isPaid,
        isDelivered: body.isDelivered,
        total: price * 1.2 + price * 0.1,
        Products: {
          create: body.products.map((item: any) => ({
            quantity: +item.qty,
            product: { connect: { id: item.productId } },
          })),
        },
      },
    });
    if (!orderRes) {
      return NextResponse.json(
        { message: 'Save Orders Failed' },
        { status: 500 }
      );
    }

    for (const item of body.products) {
      await db.product.update({
        where: { id: item.productId },
        data: {
          sold: { increment: item.qty },
          quantity: { decrement: item.qty },
          userId,
        },
      });
    }
    return NextResponse.json(
      { message: 'Save orders Succeeded' },
      { status: 201 }
    );
  } catch (error: any) {
    console.log('error', error);
    return NextResponse.json(
      { message: 'Save Orders Failed' },
      { status: 500 }
    );
  }
}
