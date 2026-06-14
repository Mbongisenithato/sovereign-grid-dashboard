import { NextResponse } from 'next/server';

// This handles the status check for your API
export async function GET() {
  return NextResponse.json({ message: "API is active" });
}

// This handles the actual prompt dispatching
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;
    
    // Add your agent/DynamoDB logic here
    console.log("Agent received prompt:", prompt);

    return NextResponse.json({ 
      success: true, 
      message: "Prompt processed", 
      received: prompt 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process prompt" }, 
      { status: 500 }
    );
  }
}