import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

export async function GET() {
  try {
    // Scan retrieves everything in the table
    const command = new ScanCommand({ TableName: "EventTelemetryTable" });
    const response = await docClient.send(command);
    
    // Check if items exist
    if (response.Items && response.Items.length > 0) {
      return NextResponse.json(response.Items[0]); // Return the first item found
    }
    
    return NextResponse.json({ 
      status: "NO_DATA_FOUND", 
      message: "Table reachable, but no items found." 
    });
  } catch (err) {
    return NextResponse.json({ 
      status: "ERROR", 
      error: String(err) 
    }, { status: 500 });
  }
}