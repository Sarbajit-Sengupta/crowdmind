import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { event } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(`
You are CrowdMind's Google Cloud Agent Builder / ADK runtime agent.

Analyze this World Cup operations event and return JSON only.

Event:
${JSON.stringify(event)}

Return:
{
  "agentBuilderRuntime": true,
  "agentName": "crowdmind_worldcup_operations_agent",
  "platform": "Google ADK / Google Cloud Agent Builder",
  "assessment": "short assessment",
  "commandDecision": "short command decision"
}
`);

    const text = result.response.text().replace(/```json|```/g, "").trim();

    return NextResponse.json(JSON.parse(text));
  } catch (error: any) {
    return NextResponse.json(
      {
        agentBuilderRuntime: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}