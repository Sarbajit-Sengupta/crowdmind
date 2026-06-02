import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { event } = await req.json();

    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are CrowdMind's multi-agent stadium operations system. Return JSON only.",
        },
        {
          role: "user",
          content: `
Event:
Match: ${event.match}
Venue: ${event.stadium}
Attendance: ${event.attendance}
Risk Score: ${event.riskScore}/10
Hotspots: ${event.hotspots.join(", ")}

Return JSON only:

{
  "security": "one concise paragraph",
  "transit": "one concise paragraph",
  "medical": "one concise paragraph",
  "commander": "one concise paragraph"
}

Do not return nested objects.
Do not return arrays.
Each value must be a single string.
`,
        },
      ],
    });

    const text = completion.choices[0].message.content || "{}";
    const cleaned = text.replace(/```json|```/g, "").trim();

    return NextResponse.json(JSON.parse(cleaned));
  } catch {
    return NextResponse.json({
      security: "Deploy additional personnel near primary hotspots.",
      transit: "Increase outbound train frequency and prepare overflow routing.",
      medical: "Position medical teams near high-density crowd zones.",
      commander: "Maintain high-alert posture and coordinate all response units.",
    });
  }
}