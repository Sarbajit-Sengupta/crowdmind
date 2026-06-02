"use client";

import { useState } from "react";

type Props = {
  event: any;
};

export default function MultiAgentPanel({ event }: Props) {
  const [agents, setAgents] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function runAgents() {
    setLoading(true);

    const res = await fetch("/api/multi-agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event }),
    });

    const data = await res.json();
    setAgents(data);
    setLoading(false);
  }

  return (
    <section className="mt-8 rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Multi-Agent Operations Council</h2>

        <button
          onClick={runAgents}
          disabled={loading}
          className="rounded-xl bg-cyan-500 px-4 py-2 font-bold text-slate-950 disabled:opacity-50"
        >
          {loading ? "Running Agents..." : "Run Agents"}
        </button>
      </div>

      {agents && (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-800 p-4">
            <h3 className="font-bold text-red-300">Security Agent</h3>
            <p className="mt-2 text-slate-300">
  {typeof agents.security === "string"
    ? agents.security
    : JSON.stringify(agents.security)}
</p>
          </div>

          <div className="rounded-xl bg-slate-800 p-4">
            <h3 className="font-bold text-yellow-300">Transit Agent</h3>
            <p className="mt-2 text-slate-300">
  {typeof agents.transit === "string"
    ? agents.transit
    : JSON.stringify(agents.transit)}
</p>
          </div>

          <div className="rounded-xl bg-slate-800 p-4">
            <h3 className="font-bold text-green-300">Medical Agent</h3>
            <p className="mt-2 text-slate-300">
  {typeof agents.medical === "string"
    ? agents.medical
    : JSON.stringify(agents.medical)}
</p>
          </div>

          <div className="rounded-xl bg-slate-800 p-4">
            <h3 className="font-bold text-cyan-300">Operations Commander</h3>
            <p className="mt-2 text-slate-300">
  {typeof agents.commander === "string"
    ? agents.commander
    : JSON.stringify(agents.commander)}
</p>
          </div>
        </div>
      )}
    </section>
  );
}