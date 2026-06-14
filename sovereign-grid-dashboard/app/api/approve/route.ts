import { NextResponse } from "next/server";

export async function POST() {
  console.log("Action approved by user");
  return NextResponse.json({ success: true });
}