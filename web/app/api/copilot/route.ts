import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { question, context } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
You are CrowdMind, an AI crowd intelligence agent for World Cup stadium operations.
Give concise, operationally useful answers.

Current event context:
Match: ${context.match}
Venue: ${context.stadium}
Attendance: ${context.attendance}
Weather: ${context.weather}
Risk: ${context.riskScore}/10 (${context.riskLevel})
Hotspots: ${context.hotspots.join(", ")}
Existing recommendations: ${context.recommendations.join(", ")}

Question:
${question}
`;

    const result = await model.generateContent(prompt);

    return Response.json({
      answer: result.response.text(),
    });
  } catch (error: any) {
    console.error("GEMINI COPILOT ERROR:", error);

    return Response.json(
      {
        error: error.message || "Failed to generate response",
      },
      { status: 500 }
    );
  }
}