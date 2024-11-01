import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/getAuthSession';

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const userId = await auth('id');

  const quantity = body.reduce((acc: any, item: any) => acc + item.qty, 0);
  const price = body.reduce(
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
        isPaid: true,
        isDelivered: true,
        total: price * 1.2 + price * 0.1,
        Products: {
          create: body.map((item: any) => ({
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

    for (const item of body) {
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

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const page = +(searchParams.get('page') ?? 0);
  const take = +(searchParams.get('take') ?? 25);

  try {
    const orders = await db.orders.findMany({
      include: {
        User: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        Products: {
          select: {
            id: true,
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                sold: true,
              },
            },
          },
        },
      },
      skip: take * page,
      take: take,
    });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error: any) {
    console.log('error', error);
    return NextResponse.json({ message: 'Get Orders Failed' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  console.log('put route');
  const putorder = await db.productsOrder.findMany({
    select: {
      id: true,
      quantity: true,
      orderId: true,
    },
  });
  const products = await db.product.findMany({
    select: {
      id: true,
    },
    take: 25,
  });
  console.log('products-ids', putorder);
  const randomProduct = products[Math.floor(Math.random() * products.length)];

  try {
    putorder.forEach(async (item) => {
      await db.productsOrder.update({
        where: { id: item.id },
        data: {
          productId: products[Math.floor(Math.random() * products.length)].id,
          quantity: Math.ceil(Math.random() * 10),
        },
      });
    });

    return NextResponse.json(
      { message: 'Update orders Succeeded' },
      { status: 201 }
    );
  } catch (error: any) {
    console.log('error', error);
    return NextResponse.json(
      { message: 'Update Orders Failed' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextResponse) {
  const data = await req.json();

  try {
    const res = await db.orders.update({
      where: { id: data.id },
      data,
    });
    return NextResponse.json({ categories: res }, { status: 202 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(req: NextResponse) {
  const data = await req.json();

  const res = await db.orders.deleteMany({ where: { id: { in: data } } });

  return NextResponse.json({ categories: res }, { status: 202 });
}
