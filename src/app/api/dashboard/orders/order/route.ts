import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  console.log('searchParams', searchParams);
  try {
    // const res = await db.orders.findFirst({
    //   where: {
    //     id: body.id,
    //   }
    // });
    return NextResponse.json({ order: 'res' }, { status: 200 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
