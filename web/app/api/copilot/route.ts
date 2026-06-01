import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
   const { question, context } = await req.json();

    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are CrowdMind, an AI crowd intelligence agent for World Cup stadium operations. Give concise, operationally useful answers.",
        },
        {
  role: "user",
  content: `
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
`,
},
      ],
    });

    return Response.json({
      answer: completion.choices[0].message.content,
    });
  } catch (error: any) {
    console.error("OPENROUTER ERROR:", error);

    return Response.json(
      {
        error: error.message || "Failed to generate response",
      },
      { status: 500 }
    );
  }
}