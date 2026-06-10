"use client";

import { useMemo, useState } from "react";

type Props = {
  event: any;
};

type AgentKey = "security" | "transit" | "medical" | "commander";
type Tone = "rose" | "amber" | "emerald" | "cyan";

type AgentConfig = {
  key: AgentKey;
  title: string;
  role: string;
  tone: Tone;
  status: string;
  confidence: number;
  fallback: string;
};

function getText(value: any) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.join(" ");
  return JSON.stringify(value);
}

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

  const configs: AgentConfig[] = useMemo(
    () => [
      {
        key: "security",
        title: "Security Agent",
        role: "Threat Control",
        tone: "rose",
        status: event?.riskScore >= 8 ? "Escalated" : "Ready",
        confidence: event?.riskScore >= 8 ? 94 : 82,
        fallback:
          "Awaiting council run. Security agent will evaluate crowd separation, gate pressure, and steward deployment.",
      },
      {
        key: "transit",
        title: "Transit Agent",
        role: "Mobility Flow",
        tone: "amber",
        status: event?.transitLoad === "high" ? "Monitoring" : "Stable",
        confidence: event?.transitLoad === "high" ? 89 : 78,
        fallback:
          "Awaiting council run. Transit agent will analyze rail pressure, arrival surges, and station bottlenecks.",
      },
      {
        key: "medical",
        title: "Medical Agent",
        role: "Response Readiness",
        tone: "emerald",
        status: event?.riskScore >= 8 ? "Standby" : "Ready",
        confidence: event?.riskScore >= 8 ? 86 : 80,
        fallback:
          "Awaiting council run. Medical agent will estimate hydration demand, response coverage, and triage readiness.",
      },
      {
        key: "commander",
        title: "Operations Commander",
        role: "Unified Decision",
        tone: "cyan",
        status: agents ? "Synchronized" : "Idle",
        confidence: agents ? 92 : 76,
        fallback:
          "Awaiting council run. Commander will synthesize all agent outputs into one operational posture.",
      },
    ],
    [event, agents]
  );

  const agentCards = configs.map((agent) => ({
    ...agent,
    output: getText(agents?.[agent.key]) || agent.fallback,
  }));

  const status = loading
    ? "Agents Running"
    : agents
    ? "Council Synchronized"
    : "Ready to Run";

  return (
    <>
      <section className="relative mt-10 overflow-hidden rounded-[2.5rem] border border-cyan-300/15 bg-[#030712]/95 p-7 shadow-[0_0_120px_rgba(34,211,238,0.10)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute right-[-120px] top-[-80px] h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-[35%] h-[360px] w-[360px] rounded-full bg-emerald-400/8 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:54px_54px]" />
        </div>

        <div className="relative z-10 mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-cyan-300">
              Rapid Agent Operations Layer
            </p>

            <h2 className="mt-2 text-4xl font-black tracking-tight text-white">
              Multi-Agent Operations Council
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Security, transit, medical, and command agents coordinate a
              unified World Cup matchday response.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
              {status}
            </span>

            <button
              onClick={runAgents}
              disabled={loading}
              className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-cyan-200 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-cyan-300/15 hover:shadow-[0_0_35px_rgba(34,211,238,0.22)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Running Agents..." : "Run Agent Council"}
            </button>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {agentCards.map((agent) => (
              <div
                key={agent.key}
                className={`agent-card agent-${agent.tone} group relative overflow-hidden rounded-[2rem] border bg-white/[0.035] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.055]`}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                </div>

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-slate-500">
                      {agent.role}
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-white">
                      {agent.title}
                    </h3>
                  </div>

                  <span className="agent-badge rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">
                    {agent.status}
                  </span>
                </div>

                <p className="relative z-10 mt-5 min-h-[96px] text-sm leading-6 text-slate-300">
                  {agent.output}
                </p>

                <div className="relative z-10 mt-5">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                      Confidence
                    </p>
                    <p className="agent-value text-sm font-black">
                      {agent.confidence}%
                    </p>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="agent-bar h-full rounded-full"
                      style={{ width: `${agent.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="relative overflow-hidden rounded-[2rem] border border-fuchsia-300/20 bg-fuchsia-300/10 p-6 shadow-[0_0_70px_rgba(217,70,239,0.10)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.18),transparent_42%)]" />

            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.35em] text-fuchsia-200">
                Council Synthesis
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                Unified Matchday Posture
              </h3>

              <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                  Active Fixture
                </p>

                <p className="mt-2 text-2xl font-black text-white">
                  {event?.match || "Selected Match"}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {event?.stadium || "World Cup Operations Zone"}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-rose-300/15 bg-rose-300/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    Risk
                  </p>
                  <p className="mt-2 text-3xl font-black text-rose-300">
                    {event?.riskScore ?? "--"}/10
                  </p>
                </div>

                <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    Agents
                  </p>
                  <p className="mt-2 text-3xl font-black text-cyan-300">
                    4
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  [
                    "Security",
                    event?.riskScore >= 8
                      ? "Elevated deployment"
                      : "Standard monitoring",
                  ],
                  [
                    "Transit",
                    event?.transitLoad === "high"
                      ? "Arrival surge watch"
                      : "Normal flow",
                  ],
                  [
                    "Medical",
                    event?.riskScore >= 8
                      ? "Standby corridor active"
                      : "Ready state",
                  ],
                  [
                    "Command",
                    agents
                      ? "Agent consensus generated"
                      : "Awaiting council run",
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-300">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <style jsx>{`
        .agent-card {
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .agent-rose {
          border-color: rgba(251, 113, 133, 0.22);
        }
        .agent-rose .agent-badge {
          border-color: rgba(251, 113, 133, 0.28);
          color: rgb(253, 164, 175);
          background: rgba(251, 113, 133, 0.1);
        }
        .agent-rose .agent-bar {
          background: linear-gradient(to right, #fb7185, #fda4af);
          box-shadow: 0 0 18px rgba(251, 113, 133, 0.4);
        }
        .agent-rose .agent-value {
          color: rgb(253, 164, 175);
        }

        .agent-amber {
          border-color: rgba(251, 191, 36, 0.22);
        }
        .agent-amber .agent-badge {
          border-color: rgba(251, 191, 36, 0.28);
          color: rgb(252, 211, 77);
          background: rgba(251, 191, 36, 0.1);
        }
        .agent-amber .agent-bar {
          background: linear-gradient(to right, #fbbf24, #fde68a);
          box-shadow: 0 0 18px rgba(251, 191, 36, 0.4);
        }
        .agent-amber .agent-value {
          color: rgb(252, 211, 77);
        }

        .agent-emerald {
          border-color: rgba(52, 211, 153, 0.22);
        }
        .agent-emerald .agent-badge {
          border-color: rgba(52, 211, 153, 0.28);
          color: rgb(110, 231, 183);
          background: rgba(52, 211, 153, 0.1);
        }
        .agent-emerald .agent-bar {
          background: linear-gradient(to right, #34d399, #6ee7b7);
          box-shadow: 0 0 18px rgba(52, 211, 153, 0.4);
        }
        .agent-emerald .agent-value {
          color: rgb(110, 231, 183);
        }

        .agent-cyan {
          border-color: rgba(34, 211, 238, 0.22);
        }
        .agent-cyan .agent-badge {
          border-color: rgba(34, 211, 238, 0.28);
          color: rgb(103, 232, 249);
          background: rgba(34, 211, 238, 0.1);
        }
        .agent-cyan .agent-bar {
          background: linear-gradient(to right, #22d3ee, #67e8f9);
          box-shadow: 0 0 18px rgba(34, 211, 238, 0.4);
        }
        .agent-cyan .agent-value {
          color: rgb(103, 232, 249);
        }
      `}</style>
    </>
  );
}