import { NextResponse } from "next/server";

async function getWorkingGeminiModel() {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || "Could not list Gemini models");
  }

  const model = data.models?.find((m: any) =>
    m.supportedGenerationMethods?.includes("generateContent")
  );

  if (!model) {
    throw new Error("No Gemini model supports generateContent for this API key");
  }

  return model.name; // example: models/gemini-2.5-flash
}

export async function POST(req: Request) {
  try {
    const { event, riskLevel, activeIncidents } = await req.json();

    const prompt = `
You are a stadium operations AI agent.

Return ONLY valid JSON:
{
  "executiveSummary": "...",
  "riskAssessment": "...",
  "immediateActions": ["...", "...", "..."],
  "resourceAllocation": {
    "security": "...",
    "medical": "...",
    "transit": "..."
  },
  "confidence": "High",
  "geminiNarrative": "..."
}

Event:
${JSON.stringify(event)}

Risk Level:
${riskLevel}

Active Incidents:
${JSON.stringify(activeIncidents)}
`;

    const modelName = await getWorkingGeminiModel();
    const matchedMemories: any[] = [];
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const geminiData = await geminiRes.json();

    if (!geminiRes.ok) {
      throw new Error(geminiData.error?.message || "Gemini API failed");
    }

    const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const decision = JSON.parse(text);

    return NextResponse.json({
  success: true,
  modelUsed: modelName,
  matchedMemories,
  decision,
});
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}