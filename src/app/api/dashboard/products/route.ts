import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json();
  console.log("body", req.body?.getReader())
  return NextResponse.json({
    message: 'api'
  }, { status: 201 })
}