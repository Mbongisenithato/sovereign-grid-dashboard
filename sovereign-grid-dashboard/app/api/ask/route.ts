import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { prompt } = await req.json();
  console.log("Agent received prompt:", prompt);
  return NextResponse.json({ success: true, message: "Agent processing..." });
}
