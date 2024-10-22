import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/getAuthSession';

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const userId = await auth('id');
  console.log('userId', userId);

  try {
    const res = await db.orders.createMany({
      data: { ...body, userId },
    });
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
