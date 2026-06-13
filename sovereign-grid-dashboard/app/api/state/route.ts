import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

export async function GET() {
  try {
    const command = new GetCommand({
      TableName: "EventTelemetryTable",
      Key: { 
        GateID: "GATE_A", // Ensure this exists in your table
        Timestamp: "2026-06-13T11:31:00Z" 
      },
    });

    const response = await docClient.send(command);
    
    // If Item exists, return it; otherwise return a helpful error
    if (response.Item) {
      return NextResponse.json(response.Item);
    } else {
      return NextResponse.json({ status: "NO_DATA_FOUND", message: "Table reachable, but no item matching that key." });
    }
  } catch (err) {
    return NextResponse.json({ status: "ERROR", error: String(err) }, { status: 500 });
  }
}