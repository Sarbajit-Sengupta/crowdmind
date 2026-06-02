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
            "You are CrowdMind, an AI incident simulation engine for stadium operations. Return one realistic crowd incident in JSON only.",
        },
        {
          role: "user",
          content: `
Match: ${event.match}
Venue: ${event.stadium}
Attendance: ${event.attendance}
Risk Score: ${event.riskScore}/10
Hotspots: ${event.hotspots.join(", ")}

Return JSON with:
{
  "level": "critical | warning | medium",
  "location": "...",
  "message": "...",
  "action": "..."
}
`,
        },
      ],
    });

    const text = completion.choices[0].message.content || "{}";
    const cleaned = text.replace(/```json|```/g, "").trim();

    return NextResponse.json(JSON.parse(cleaned));
  } catch (error: any) {
    return NextResponse.json(
      {
        level: "warning",
        location: "Gate A",
        message: "AI simulation unavailable; fallback congestion alert generated.",
        action: "Deploy additional staff and redirect arrivals to Gate C.",
      },
      { status: 200 }
    );
  }
}