"use client";

import { useState } from "react";
import { getCopilotResponse } from "@/src/lib/copilot";

export default function CopilotBox() {
  const [question, setQuestion] = useState("What should security do before kickoff?");
  const [answers, setAnswers] = useState<string[]>(
    getCopilotResponse("security")
  );

  function askCopilot() {
    setAnswers(getCopilotResponse(question));
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
          className="rounded-xl bg-cyan-500 px-6 font-bold text-slate-950"
        >
          Ask
        </button>
      </div>

      <div className="mt-4 rounded-xl bg-cyan-950 border border-cyan-800 p-4">
        <p className="text-cyan-300 font-semibold mb-3">
          CrowdMind Agent Response
        </p>

        <ul className="space-y-2">
          {answers.map((answer) => (
            <li key={answer}>• {answer}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}