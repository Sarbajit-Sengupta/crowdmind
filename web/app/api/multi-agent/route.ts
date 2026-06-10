import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { event } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
You are CrowdMind's multi-agent stadium operations system.

Return ONLY valid JSON:
{
  "security": "one concise paragraph",
  "transit": "one concise paragraph",
  "medical": "one concise paragraph",
  "commander": "one concise paragraph"
}

Event:
Match: ${event.match}
Venue: ${event.stadium}
Attendance: ${event.attendance}
Risk Score: ${event.riskScore}/10
Hotspots: ${event.hotspots.join(", ")}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleaned = text.replace(/```json|```/g, "").trim();

    return NextResponse.json(JSON.parse(cleaned));
  } catch (error) {
    console.error("GEMINI MULTI AGENT ERROR:", error);

    return NextResponse.json({
      security: "Deploy additional personnel near primary hotspots.",
      transit: "Increase outbound train frequency and prepare overflow routing.",
      medical: "Position medical teams near high-density crowd zones.",
      commander: "Maintain high-alert posture and coordinate all response units.",
    });
  }
}