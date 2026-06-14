import { NextResponse } from "next/server";

export async function GET() {
  // Replace this with your actual DynamoDB call
  const state = { 
    status: "OPERATIONAL", 
    pending_action: null 
  };
  
  return NextResponse.json(state);
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ 
    message: "State update received", 
    received: body 
  });
}