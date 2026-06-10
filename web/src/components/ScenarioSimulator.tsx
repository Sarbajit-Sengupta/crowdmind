"use client";

import { useMemo, useState } from "react";
import { calculateRisk, getRiskLevel } from "@/src/lib/riskEngine";

type Props = {
  baseAttendance: number;
  weather: string;
  rivalryLevel: "low" | "medium" | "high";
  transitLoad: "low" | "medium" | "high";
};

type ScenarioKey =
  | "baseline"
  | "railDelay"
  | "gateClosure"
  | "stormCell"
  | "medicalSurge"
  | "rivalFanCollision";

const scenarios: Record<
  ScenarioKey,
  {
    title: string;
    label: string;
    description: string;
    attendanceBoost: number;
    incidentBoost: number;
    transitOverride?: "low" | "medium" | "high";
    weatherOverride?: string;
    tone: string;
  }
> = {
  baseline: {
    title: "Baseline Forecast",
    label: "Normal",
    description: "Standard pre-match operations posture.",
    attendanceBoost: 0,
    incidentBoost: 3,
    tone: "cyan",
  },
  railDelay: {
    title: "Rail Delay",
    label: "Transit",
    description: "Rail arrivals compress into a shorter pre-kickoff window.",
    attendanceBoost: 6000,
    incidentBoost: 5,
    transitOverride: "high",
    tone: "amber",
  },
  gateClosure: {
    title: "Gate Closure",
    label: "Access",
    description: "One primary gate is unavailable during peak ingress.",
    attendanceBoost: 8500,
    incidentBoost: 6,
    tone: "rose",
  },
  stormCell: {
    title: "Storm Cell",
    label: "Weather",
    description: "Rain forces fans into covered concourses and slows flow.",
    attendanceBoost: 4000,
    incidentBoost: 5,
    weatherOverride: "storm",
    tone: "violet",
  },
  medicalSurge: {
    title: "Medical Surge",
    label: "Medical",
    description: "Multiple concourse medical calls reduce response capacity.",
    attendanceBoost: 3000,
    incidentBoost: 6,
    tone: "emerald",
  },
  rivalFanCollision: {
    title: "Rival Fan Collision",
    label: "Security",
    description: "Rival fan movement overlaps near a high-density plaza.",
    attendanceBoost: 7500,
    incidentBoost: 8,
    tone: "fuchsia",
  },
};

export default function ScenarioSimulator({
  baseAttendance,
  weather,
  rivalryLevel,
  transitLoad,
}: Props) {
  const [attendance, setAttendance] = useState(baseAttendance);
  const [selectedScenario, setSelectedScenario] =
    useState<ScenarioKey>("baseline");

  const scenario = scenarios[selectedScenario];

  const effectiveAttendance = Math.min(
    95000,
    attendance + scenario.attendanceBoost
  );

  const effectiveTransit = scenario.transitOverride || transitLoad;
  const effectiveWeather = scenario.weatherOverride || weather;

  const baseRisk = calculateRisk({
    attendance: baseAttendance,
    weather,
    rivalryLevel,
    transitLoad,
    pastIncidents: 3,
  });

  const simulatedRisk = calculateRisk({
    attendance: effectiveAttendance,
    weather: effectiveWeather,
    rivalryLevel,
    transitLoad: effectiveTransit,
    pastIncidents: scenario.incidentBoost,
  });

  const riskDelta = simulatedRisk - baseRisk;

  const scenarioImpact = useMemo(() => {
    const riskLevel = getRiskLevel(simulatedRisk);

    if (simulatedRisk >= 9) {
      return {
        posture: "Critical Command",
        recommendation: "Open overflow gates, split rivalry fan flows, stage medical teams, and deploy rapid-response security.",
        resolution: "22–30 min",
        confidence: 94,
        color: "rose",
      };
    }

    if (simulatedRisk >= 7) {
      return {
        posture: "Elevated Response",
        recommendation: "Increase gate stewards, monitor transit pressure, and pre-position crowd control teams.",
        resolution: "15–22 min",
        confidence: 88,
        color: "amber",
      };
    }

    return {
      posture: "Controlled Monitoring",
      recommendation: "Maintain standard staffing with targeted monitoring around entry and transit clusters.",
      resolution: "8–14 min",
      confidence: 82,
      color: "cyan",
    };
  }, [simulatedRisk]);
async function saveSimulationToElastic() {
  try {
    const simulationReport = {
      match: "Scenario Simulation",
      stadium: "World Cup 2026 Venue",
      riskLevel: getRiskLevel(simulatedRisk),
      reportType: "scenario_simulation",

      summary: `${scenario.title} simulation projects ${getRiskLevel(
        simulatedRisk
      )} risk with a score of ${simulatedRisk}/10.`,

      impact: [
        `Scenario: ${scenario.title}`,
        `Attendance: ${effectiveAttendance.toLocaleString()}`,
        `Risk delta: ${riskDelta >= 0 ? "+" : ""}${riskDelta}`,
        `Weather condition: ${effectiveWeather}`,
        `Transit pressure: ${effectiveTransit}`,
      ],

      priorityActions: [
        scenarioImpact.recommendation,
        `Response window: ${scenarioImpact.resolution}`,
        `Command posture: ${scenarioImpact.posture}`,
      ],
    };

    const res = await fetch("/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(simulationReport),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to save simulation");
    }

    alert("Simulation saved to Elastic Memory");
  } catch (error: any) {
    console.error("SAVE SIMULATION ERROR:", error);
    alert(error.message || "Could not save simulation");
  }
}
  return (
    <>
      <section className="relative mt-10 overflow-hidden rounded-[2.5rem] border border-cyan-300/15 bg-[#030712] p-7 shadow-[0_0_120px_rgba(34,211,238,0.10)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-28 top-12 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute right-[-120px] top-[-80px] h-[420px] w-[420px] rounded-full bg-fuchsia-500/12 blur-3xl" />
          <div className="absolute bottom-[-120px] left-[35%] h-[360px] w-[360px] rounded-full bg-rose-500/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <div className="relative z-10 mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-fuchsia-300">
              What-If Command Simulator
            </p>

            <h2 className="mt-2 text-4xl font-black tracking-tight text-white">
              Pre-Match Incident War Room
            </h2>

            <p className="mt-2 max-w-3xl text-sm text-slate-400">
              Simulate future World Cup matchday disruptions before kickoff and
              see how crowd risk, command posture, and response strategy change.
            </p>
          </div>

          <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
            Predictive Simulation
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-7 xl:grid-cols-[0.95fr_1.1fr_0.95fr]">
          {/* Scenario selector */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">
              Select Disruption
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3">
              {(Object.keys(scenarios) as ScenarioKey[]).map((key) => {
                const item = scenarios[key];
                const active = selectedScenario === key;

                return (
                  <button
  onClick={saveSimulationToElastic}
  className="mt-5 w-full rounded-2xl border border-fuchsia-300/25 bg-fuchsia-300/10 px-5 py-4 text-sm font-black uppercase tracking-[0.24em] text-fuchsia-200 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-300/45 hover:bg-fuchsia-300/15 hover:shadow-[0_0_35px_rgba(217,70,239,0.18)]"
>
  Save Simulation to Elastic 
</button>
                );
              })}
            </div>
          </div>

          {/* Main simulation panel */}
          <div className="relative overflow-hidden rounded-[2rem] border border-fuchsia-300/20 bg-slate-950/75 p-6 shadow-[0_0_90px_rgba(217,70,239,0.10)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.14),transparent_48%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.10),transparent_36%)]" />
            <div className="sim-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-fuchsia-300/12 to-transparent" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-fuchsia-300">
                    Active Scenario
                  </p>
                  <h3 className="mt-2 text-3xl font-black text-white">
                    {scenario.title}
                  </h3>
                </div>

                <span className="rounded-full border border-fuchsia-300/25 bg-fuchsia-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-fuchsia-300">
                  Running
                </span>
              </div>

              <div className="mt-7 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-slate-500">
                      Attendance Load
                    </p>
                    <p className="mt-2 text-4xl font-black text-white">
                      {effectiveAttendance.toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Base: {baseAttendance.toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-slate-500">
                      Risk Delta
                    </p>
                    <p
                      className={`mt-2 text-4xl font-black ${
                        riskDelta >= 3
                          ? "text-rose-300"
                          : riskDelta >= 1
                          ? "text-amber-300"
                          : "text-cyan-300"
                      }`}
                    >
                      {riskDelta >= 0 ? "+" : ""}
                      {riskDelta}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      vs baseline
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-[10px] uppercase tracking-[0.32em] text-slate-500">
                      Manual Attendance Control
                    </label>
                    <span className="text-xs font-bold text-cyan-300">
                      {attendance.toLocaleString()}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="50000"
                    max="95000"
                    step="1000"
                    value={attendance}
                    onChange={(e) => setAttendance(Number(e.target.value))}
                    className="sim-range w-full"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-rose-300/20 bg-rose-300/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                    Sim Risk
                  </p>
                  <p className="mt-2 text-4xl font-black text-white">
                    {simulatedRisk}/10
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase text-rose-300">
                    {getRiskLevel(simulatedRisk)}
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                    Resolution
                  </p>
                  <p className="mt-2 text-3xl font-black text-white">
                    {scenarioImpact.resolution}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    projected response
                  </p>
                </div>

                <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                    Confidence
                  </p>
                  <p className="mt-2 text-3xl font-black text-white">
                    {scenarioImpact.confidence}%
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    simulation certainty
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Command outcome */}
          <div className="rounded-[2rem] border border-cyan-300/15 bg-white/[0.035] p-5 backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">
              AI Command Output
            </p>

            <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-slate-500">
                Command Posture
              </p>

              <h3
                className={`mt-3 text-3xl font-black ${
                  scenarioImpact.color === "rose"
                    ? "text-rose-300"
                    : scenarioImpact.color === "amber"
                    ? "text-amber-300"
                    : "text-cyan-300"
                }`}
              >
                {scenarioImpact.posture}
              </h3>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                {scenarioImpact.recommendation}
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {[
                ["Weather", effectiveWeather],
                ["Transit", effectiveTransit],
                ["Rivalry", rivalryLevel],
                ["Incident Load", scenario.incidentBoost],
              ].map(([label, value]) => (
                <div
                  key={String(label)}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
                >
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    {label}
                  </p>
                  <p className="text-sm font-black capitalize text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <button
  onClick={saveSimulationToElastic}
  className="mt-5 w-full rounded-2xl border border-fuchsia-300/25 bg-fuchsia-300/10 px-5 py-4 text-sm font-black uppercase tracking-[0.24em] text-fuchsia-200 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-300/45 hover:bg-fuchsia-300/15 hover:shadow-[0_0_35px_rgba(217,70,239,0.18)]"
>
  Save Simulation to Elastic 
</button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .scenario-btn {
          border-color: rgba(255, 255, 255, 0.08);
        }

        .scenario-cyan:hover,
        .scenario-cyan {
          border-color: rgba(34, 211, 238, 0.2);
        }

        .scenario-amber:hover,
        .scenario-amber {
          border-color: rgba(251, 191, 36, 0.2);
        }

        .scenario-rose:hover,
        .scenario-rose {
          border-color: rgba(251, 113, 133, 0.2);
        }

        .scenario-violet:hover,
        .scenario-violet {
          border-color: rgba(167, 139, 250, 0.2);
        }

        .scenario-emerald:hover,
        .scenario-emerald {
          border-color: rgba(52, 211, 153, 0.2);
        }

        .scenario-fuchsia:hover,
        .scenario-fuchsia {
          border-color: rgba(217, 70, 239, 0.2);
        }

        .sim-range {
          accent-color: #22d3ee;
        }

        .sim-scan {
          animation: simScan 5s linear infinite;
        }

        @keyframes simScan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(520px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
} 