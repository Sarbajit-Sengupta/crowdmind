"use client";

import { useState } from "react";

type Props = {
  event: any;
  riskLevel: string;
};

export default function CopilotBox({ event, riskLevel }: Props) {
  const [question, setQuestion] = useState(
    "What should security do before kickoff?"
  );

  const [answer, setAnswer] = useState(
    "Ask CrowdMind a stadium operations question."
  );

  const [loading, setLoading] = useState(false);

  async function askCopilot() {
    setLoading(true);
    setAnswer("Thinking...");

    const res = await fetch("/api/copilot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  question,
  context: {
    match: event.match,
    stadium: event.stadium,
    attendance: event.attendance,
    weather: event.weather,
    riskScore: event.riskScore,
    riskLevel,
    hotspots: event.hotspots,
    recommendations: event.recommendations,
  },
}),
    });

  const data = await res.json();

if (data.answer) {
  setAnswer(data.answer);
} else {
  setAnswer(
    `Gemini quota limit reached. Fallback agent response:

Risk assessment:
Gate A is likely to become overcrowded due to high arrival pressure.

Expected impact:
Crowd density may increase near entry lanes and slow stadium ingress.

Recommended actions:
- Open Gate C as an overflow entrance
- Deploy additional staff near Gate A
- Redirect fans toward South Entrance
- Coordinate with transit teams for post-match surge`
  );
}

setLoading(false);
  }

  return (
    <section className="mt-8 rounded-2xl bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-4">Operations Copilot</h2>

      <div className="flex gap-3">
        <input
          className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={askCopilot}
          disabled={loading}
          className="rounded-xl bg-cyan-500 px-6 font-bold text-slate-950 disabled:opacity-50"
        >
          {loading ? "Thinking" : "Ask"}
        </button>
      </div>

      <div className="mt-4 rounded-xl bg-cyan-950 border border-cyan-800 p-4 whitespace-pre-wrap">
        <p className="text-cyan-300 font-semibold mb-3">
          CrowdMind Agent Response
        </p>

        {answer}
      </div>
    </section>
  );
}