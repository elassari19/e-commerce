import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  try {
    const res = await db.orders.createMany({
      data: body
    })
  } catch (error: any) {
    console.log('error', error)
    return NextResponse.json({message: 'Save Orders Failed'},{ status: 500});
  }

}