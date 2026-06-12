import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ status: "OPERATIONAL", pending_action: null });
}
