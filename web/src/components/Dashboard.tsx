  "use client";

  import { useState } from "react";
  import { matches, MatchKey, MatchData } from "@/src/data/matches";
  import { liveIncidents } from "@/src/data/liveIncidents";
  import { timeline } from "@/src/data/timeline";
  import { getRiskLevel } from "@/src/lib/riskEngine";
  import { explainRisk } from "@/src/lib/explanationEngine";
  import { generateSituationReport } from "@/src/lib/reportEngine";

  import RiskMap from "@/src/components/RiskMap";
  import LiveIncidentFeed from "@/src/components/LiveIncidentFeed";
  import ScenarioSimulator from "@/src/components/ScenarioSimulator";
 
  import RiskTrendChart from "@/src/components/RiskTrendChart";
  import MultiAgentPanel from "@/src/components/MultiAgentPanel";
  import OperationsStatusBoard from "@/src/components/OperationsStatusBoard";
  import CommandActionPlan from "@/src/components/CommandActionPlan";
  import AIIncidentTimeline from "@/src/components/AIIncidentTimeline";
  import ResourceAllocationPanel from "@/src/components/ResourceAllocationPanel";

  import WorldCupBackground from "@/src/components/WorldCupBackground";
  import GlassPanel from "@/src/components/GlassPanel";
  import CommandShell from "@/src/components/CommandShell";
import FuturisticCommandHero from "./FuturisticCommandHero";
import EventIntelligenceStrip from "./EventIntelligenceStrip";
import WeatherCard from "./WeatherCard";

  export default function Dashboard() {
    const [selectedMatch, setSelectedMatch] =
      useState<MatchKey>("argentinaBrazil");

    const [aiIncident, setAiIncident] = useState<any>(null);
    const [generatingIncident, setGeneratingIncident] = useState(false);

    const event: MatchData = matches[selectedMatch];
    const riskLevel = getRiskLevel(event.riskScore);

    const riskReasons = explainRisk(
      event.attendance,
      event.weather,
      event.rivalryLevel,
      event.transitLoad
    );

    

    const activeIncidents =
      liveIncidents[selectedMatch as keyof typeof liveIncidents] || [];

    const timelineEvents =
      timeline[selectedMatch as keyof typeof timeline] || [];

    const report = generateSituationReport(event, riskLevel);

  const [agentDecision, setAgentDecision] = useState<any>(null);
  const [runningAgent, setRunningAgent] = useState(false);
  const [agentMemory, setAgentMemory] = useState<any[]>([]);
  const [matchedMemories, setMatchedMemories] = useState<any[]>([]);

    async function saveReport() {
      await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          match: event.match,
          stadium: event.stadium,
          riskScore: event.riskScore,
          riskLevel,
          summary: report.summary,
          impact: report.impact,
          priorityActions: report.priorityActions,
        }),
      });

      alert("Situation report saved to Elastic");
    }
    

    async function generateIncident() {
      setGeneratingIncident(true);

      const res = await fetch("/api/generate-incident", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event }),
      });

      const data = await res.json();
      setAiIncident(data);

      await fetch("/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          match: event.match,
          ...data,
        }),
      });

      setGeneratingIncident(false);
    }
    async function runAgentBuilderCheck() {
  const res = await fetch("/api/agent-builder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ event }),
  });

  const data = await res.json();
  console.log("Agent Builder Runtime:", data);
  alert("Agent Builder runtime called successfully");
}
    async function loadAgentMemory() {
    const res = await fetch("/api/agent-memory");
    const data = await res.json();

    if (data.success) {
      setAgentMemory(data.memory);
    }
  }

    async function runOperationsAgent() {
    setRunningAgent(true);

    const res = await fetch("/api/agent-command", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event,
        riskLevel,
        activeIncidents,
      }),
    });

    const data = await res.json();

  if (data.success) {
    setAgentDecision(data.decision);
    setMatchedMemories(data.matchedMemories || []);
    loadAgentMemory();
  } else {
    alert(data.error);
  }

    setRunningAgent(false);
  }

    return (
      <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white p-8 md:p-10">
        <WorldCupBackground />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <div className="relative inline-block">
  <div className="mb-3 flex items-center gap-3">
    <span className="h-px w-10 bg-gradient-to-r from-transparent via-[#f8d66d] to-[#f8d66d]" />
    <span className="text-[10px] font-black uppercase tracking-[0.45em] text-[#f8d66d] drop-shadow-[0_0_12px_rgba(248,214,109,0.45)]">
      FIFA WORLD CUP 2026
    </span>
    <span className="h-px w-10 bg-gradient-to-r from-[#f8d66d] via-cyan-300 to-transparent" />
  </div>

  <h1 className="wc-crowdmind-title relative text-6xl font-black leading-none tracking-[-0.075em] md:text-7xl">
    CrowdMind
  </h1>

  <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-gradient-to-r from-[#f8d66d] via-cyan-300 to-[#4f7cff] shadow-[0_0_22px_rgba(34,211,238,0.35)]">
    <div className="wc-title-runner h-full w-28 rounded-full bg-white shadow-[0_0_22px_rgba(255,255,255,0.9)]" />
  </div>

  <style jsx>{`
    .wc-crowdmind-title {
      color: transparent;
      background:
        linear-gradient(
          110deg,
          #fff7d6 0%,
          #f8d66d 14%,
          #53f0ff 35%,
          #2f86ff 58%,
          #8b5cf6 78%,
          #fff7d6 100%
        );
      background-size: 280% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      text-shadow:
        0 0 28px rgba(34, 211, 238, 0.28),
        0 0 52px rgba(248, 214, 109, 0.16);
      animation: wcTitleGradient 5.5s ease-in-out infinite;
    }

    .wc-crowdmind-title::before {
      content: "CrowdMind";
      position: absolute;
      inset: 0;
      z-index: -1;
      color: transparent;
      -webkit-text-stroke: 1px rgba(248, 214, 109, 0.34);
      transform: translate(4px, 5px);
      filter: blur(2px);
      opacity: 0.8;
    }

    .wc-crowdmind-title::after {
      content: "";
      position: absolute;
      left: -14%;
      top: 0;
      height: 100%;
      width: 18%;
      transform: skewX(-18deg);
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.82),
        transparent
      );
      animation: wcTitleSweep 4s ease-in-out infinite;
      mix-blend-mode: screen;
    }

    .wc-title-runner {
      animation: wcLineRun 2.8s ease-in-out infinite;
    }

    @keyframes wcTitleGradient {
      0%,
      100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }

    @keyframes wcTitleSweep {
      0%,
      32% {
        transform: translateX(-240%) skewX(-18deg);
        opacity: 0;
      }
      45% {
        opacity: 0.9;
      }
      72%,
      100% {
        transform: translateX(720%) skewX(-18deg);
        opacity: 0;
      }
    }

    @keyframes wcLineRun {
      0% {
        transform: translateX(-130%);
        opacity: 0;
      }
      25% {
        opacity: 1;
      }
      100% {
        transform: translateX(620%);
        opacity: 0;
      }
    }
  `}</style>
</div>

              <p className="mt-2 text-slate-400 text-lg">
                AI-Powered Stadium Operations Command Center
              </p>
            </div>

            <div className="mt-4 lg:mt-0 flex gap-3">
              <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500 text-green-300 font-medium">
                ● LIVE OPS
              </div>

              <div className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500 text-cyan-300 font-medium">
                AI ACTIVE
              </div>
              <div
  onClick={runAgentBuilderCheck}
  className="cursor-pointer px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500 text-purple-300 font-medium hover:bg-purple-500/30"
>
  AGENT BUILDER
</div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent" />

          <FuturisticCommandHero />
          <EventIntelligenceStrip />


  <section className="mt-10">
  <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
    <div>
      <p className="text-xs uppercase tracking-[0.45em] text-cyan-300">
        FIFA World Cup 2026
      </p>

      <h2 className="mt-2 text-4xl font-black tracking-tight">
        Matchday Command Selection
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Select a neutral-site fixture to load its live operational intelligence profile.
      </p>
    </div>

    <div className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.28em] text-fuchsia-200 shadow-[0_0_35px_rgba(217,70,239,0.12)]">
      Live Fixture Matrix
    </div>
  </div>

  <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
    {[
      {
        key: "argentinaBrazil",
        codeA: "ARG",
        codeB: "BRA",
        teamA: "Argentina",
        teamB: "Brazil",
        venue: "MetLife Stadium",
        city: "New Jersey, USA",
        fixtureType: "South American Rivalry",
        attendance: "82K",
        risk: "Critical",
        accent: "from-sky-300 via-cyan-300 to-yellow-300",
        glow: "rgba(34,211,238,0.25)",
      },
      {
        key: "usaMexico",
        codeA: "USA",
        codeB: "MEX",
        teamA: "United States",
        teamB: "Mexico",
        venue: "SoFi Stadium",
        city: "Los Angeles, USA",
        fixtureType: "Host Nation Fixture",
        attendance: "70K",
        risk: "High",
        accent: "from-blue-400 via-cyan-300 to-emerald-300",
        glow: "rgba(45,212,191,0.25)",
      },
      {
        key: "englandFrance",
        codeA: "ENG",
        codeB: "FRA",
        teamA: "England",
        teamB: "France",
        venue: "AT&T Stadium",
        city: "Arlington, USA",
        fixtureType: "European Rivalry",
        attendance: "76K",
        risk: "High",
        accent: "from-rose-300 via-white to-blue-400",
        glow: "rgba(168,85,247,0.22)",
      },
    ].map((match) => {
      const active = selectedMatch === match.key;

      return (
        <button
          key={match.key}
          onClick={() => setSelectedMatch(match.key as MatchKey)}
          className={`group relative min-h-[360px] overflow-hidden rounded-[2.25rem] border p-6 text-left transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] ${
            active
              ? "border-cyan-300/70 bg-cyan-400/[0.13] shadow-[0_0_70px_rgba(34,211,238,0.25)]"
              : "border-white/10 bg-slate-950/65 hover:border-cyan-300/40 hover:bg-cyan-400/[0.07]"
          }`}
        >
          
          <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${match.accent}`} />

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/20" />
            <div className="absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-fuchsia-400/10 blur-3xl transition-all duration-500 group-hover:bg-fuchsia-400/20" />
            <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:34px_34px]" />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.38em] text-slate-500">
                Fixture Class
              </p>
              <p className="mt-2 text-sm font-black uppercase text-cyan-300">
                {match.fixtureType}
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] transition-all duration-300 ${
                active
                  ? "bg-cyan-300 text-slate-950 shadow-[0_0_24px_rgba(103,232,249,0.45)]"
                  : "border border-white/10 bg-white/[0.04] text-slate-400 group-hover:text-cyan-300"
              }`}
            >
              {active ? "Active" : "Load"}
            </span>
          </div>

          <div className="relative z-10 mt-7 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">
                  Home
                </p>
                <h3 className="mt-2 text-5xl font-black tracking-tight text-white">
                  {match.codeA}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{match.teamA}</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_30px_rgba(34,211,238,0.18)]">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-300/10 to-fuchsia-300/10" />
                  <span className="relative z-10 text-sm font-black text-cyan-200">
                    VS
                  </span>
                </div>

                <div className="mt-3 h-12 w-px bg-gradient-to-b from-cyan-300/70 to-transparent" />
              </div>

              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">
                  Away
                </p>
                <h3 className="mt-2 text-5xl font-black tracking-tight text-white">
                  {match.codeB}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{match.teamB}</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-5 grid grid-cols-[1.2fr_0.8fr] gap-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-[10px] uppercase tracking-[0.32em] text-slate-500">
                Host Venue
              </p>
              <p className="mt-2 font-black text-white">{match.venue}</p>
              <p className="text-sm text-slate-400">{match.city}</p>
            </div>

            <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4 text-right">
              <p className="text-[10px] uppercase tracking-[0.32em] text-slate-500">
                Load
              </p>
              <p className="mt-2 text-3xl font-black text-cyan-300">
                {match.attendance}
              </p>
              <p className="text-xs text-slate-500">projected</p>
            </div>
          </div>

          <div className="relative z-10 mt-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">
                Operational Risk
              </p>
              <p
                className={`mt-1 text-lg font-black uppercase ${
                  match.risk === "Critical" ? "text-rose-300" : "text-yellow-300"
                }`}
              >
                {match.risk}
              </p>
            </div>

            <div className="relative h-12 w-12 rounded-full border border-cyan-300/25 bg-cyan-300/10">
              <span className="absolute inset-2 rounded-full bg-cyan-300/20 blur-sm" />
              <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
            </div>
          </div>

          <div className="relative z-10 mt-5 h-[3px] w-full overflow-hidden rounded-full bg-white/5">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${match.accent} transition-all duration-700 ${
                active ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.035] to-transparent" />
          </div>
        </button>
      );
    })}
  </div>
</section>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
    {[
      {
        label: "Security",
        value: "READY",
        color: "green",
        border: "border-green-400/40",
        text: "text-green-300",
        glow: "hover:shadow-[0_0_35px_rgba(74,222,128,0.25)]",
      },
      {
        label: "Transit",
        value: "MONITORING",
        color: "yellow",
        border: "border-yellow-400/40",
        text: "text-yellow-300",
        glow: "hover:shadow-[0_0_35px_rgba(250,204,21,0.25)]",
      },
      {
        label: "Medical",
        value: "STANDBY",
        color: "cyan",
        border: "border-cyan-400/40",
        text: "text-cyan-300",
        glow: "hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]",
      },
      {
        label: "Risk Level",
        value: riskLevel.toUpperCase(),
        color: "red",
        border: "border-red-400/40",
        text: "text-red-300",
        glow: "hover:shadow-[0_0_35px_rgba(248,113,113,0.25)]",
      },
    ].map((item) => (
      <div
        key={item.label}
        className={`group relative overflow-hidden rounded-3xl border ${item.border} bg-slate-950/55 p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 ${item.glow}`}
      >
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/5 blur-2xl transition-all duration-500 group-hover:bg-white/10" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
              {item.label}
            </p>

            <h3 className={`mt-3 text-2xl font-black ${item.text}`}>
              {item.value}
            </h3>
          </div>

          <div className={`h-3 w-3 rounded-full ${item.text.replace("text", "bg")} shadow-[0_0_20px_currentColor]`} />
        </div>

        <div className="relative z-10 mt-5 h-[2px] w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full w-2/3 rounded-full ${
              item.color === "green"
                ? "bg-green-400"
                : item.color === "yellow"
                ? "bg-yellow-400"
                : item.color === "cyan"
                ? "bg-cyan-400"
                : "bg-red-400"
            }`}
          />
        </div>
      </div>
    ))}
  </section>

 <section className="relative mt-10 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#030712]/90 p-7 shadow-[0_0_120px_rgba(34,211,238,0.10)]">
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
    <div className="absolute right-[-120px] top-[-80px] h-[420px] w-[420px] rounded-full bg-rose-500/10 blur-3xl" />
    <div className="absolute bottom-[-120px] left-[35%] h-[360px] w-[360px] rounded-full bg-fuchsia-500/10 blur-3xl" />
    <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:52px_52px]" />
  </div>

  <div className="relative z-10 mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div>
      <p className="text-xs uppercase tracking-[0.45em] text-cyan-300">
        Live Stadium Intelligence
      </p>

      <h2 className="mt-2 text-4xl font-black tracking-tight text-white">
        Threat Board
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        Real-time operational posture for the selected World Cup fixture.
      </p>
    </div>

    <div className="rounded-full border border-rose-400/30 bg-rose-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.28em] text-rose-300 shadow-[0_0_35px_rgba(251,113,133,0.12)]">
      {riskLevel} Risk
    </div>
  </div>

  <div className="relative z-10 grid grid-cols-1 gap-7 xl:grid-cols-[0.9fr_1.25fr_0.85fr]">
    {/* Fixture context */}
    <div className="rounded-[2rem] border border-cyan-300/15 bg-white/[0.035] p-6 backdrop-blur-xl">
      <p className="text-[10px] uppercase tracking-[0.38em] text-slate-500">
        Selected Fixture
      </p>

      <h3 className="mt-4 text-4xl font-black leading-tight text-white">
        {event.match}
      </h3>

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
          Host Stadium
        </p>
        <p className="mt-2 text-lg font-black text-cyan-200">
          {event.stadium}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          FIFA World Cup 2026 Operations Zone
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
            Crowd Load
          </p>
          <p className="mt-2 text-3xl font-black text-cyan-300">
            {Math.round(event.attendance / 1000)}K
          </p>
        </div>

        <div className="rounded-2xl border border-amber-300/15 bg-amber-300/10 p-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
            Transit
          </p>
          <p className="mt-2 text-3xl font-black capitalize text-amber-300">
            {event.transitLoad}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-fuchsia-300/15 bg-fuchsia-300/10 p-4">
        <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
          Rivalry Pressure
        </p>
        <p className="mt-2 text-2xl font-black capitalize text-fuchsia-300">
          {event.rivalryLevel}
        </p>
      </div>
    </div>

    {/* Center tactical map */}
    <div className="relative overflow-hidden rounded-[2rem] border border-emerald-300/20 bg-emerald-950/10 p-5 shadow-[0_0_90px_rgba(16,185,129,0.10)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.16),transparent_48%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(52,211,153,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.8)_1px,transparent_1px)] [background-size:34px_34px]" />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-emerald-300">
            Stadium Flow Model
          </p>
          <p className="mt-1 text-lg font-black text-white">
            Crowd Density Perimeter
          </p>
        </div>

        <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-300">
          Live Model
        </div>
      </div>

      {(() => {
        const matchSeed =
          selectedMatch === "argentinaBrazil"
            ? 8
            : selectedMatch === "usaMexico"
            ? 3
            : -2;

        const transitBoost =
          event.transitLoad === "high"
            ? 8
            : event.transitLoad === "medium"
            ? 4
            : 1;

        const rivalryBoost =
          event.rivalryLevel === "high"
            ? 7
            : event.rivalryLevel === "medium"
            ? 4
            : 1;

        const baseDensity = Math.min(
          94,
          Math.max(
            38,
            Math.round(
              event.riskScore * 6 +
                event.attendance / 4000 +
                transitBoost +
                rivalryBoost +
                matchSeed
            )
          )
        );

        const stands = [
          ["North", Math.min(96, baseDensity + 4), "top-[8%] left-1/2 -translate-x-1/2"],
          ["East", Math.min(96, baseDensity - 9), "right-[6%] top-1/2 -translate-y-1/2"],
          ["South", Math.min(96, baseDensity + 9), "bottom-[8%] left-1/2 -translate-x-1/2"],
          ["West", Math.min(96, baseDensity - 16), "left-[6%] top-1/2 -translate-y-1/2"],
        ];

        function tone(value: number) {
          if (value >= 82) return "border-rose-300/30 bg-rose-400/15 text-rose-300";
          if (value >= 65) return "border-amber-300/30 bg-amber-400/15 text-amber-300";
          return "border-emerald-300/30 bg-emerald-400/15 text-emerald-300";
        }

        return (
          <div className="relative mt-6 h-[430px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/70">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.10),transparent_45%)]" />

            {/* heat blobs */}
            <div className="absolute left-[18%] top-[8%] h-28 w-[58%] rounded-full bg-rose-400/35 blur-2xl" />
            <div className="absolute right-[8%] top-[25%] h-[50%] w-36 rounded-full bg-amber-300/35 blur-2xl" />
            <div className="absolute left-[20%] bottom-[8%] h-28 w-[55%] rounded-full bg-rose-400/30 blur-2xl" />
            <div className="absolute left-[8%] top-[28%] h-[48%] w-32 rounded-full bg-cyan-300/20 blur-2xl" />

            {/* stadium shell */}
            <div className="absolute inset-8 rounded-[2rem] border border-cyan-300/25" />
            <div className="absolute inset-14 rounded-[1.6rem] border border-cyan-300/15" />

            {/* pitch */}
            <div className="absolute left-[22%] right-[22%] top-[27%] bottom-[27%] rounded-xl border border-emerald-300/50 bg-emerald-950/80 backdrop-blur-sm">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-emerald-300/35" />
              <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/40" />
              <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/70" />
              <div className="absolute left-0 top-1/2 h-24 w-14 -translate-y-1/2 border-y border-r border-emerald-300/35" />
              <div className="absolute right-0 top-1/2 h-24 w-14 -translate-y-1/2 border-y border-l border-emerald-300/35" />
            </div>

            {/* perimeter density labels */}
            {stands.map(([name, value, pos]) => (
              <div
                key={String(name)}
                className={`absolute ${pos} rounded-2xl border px-4 py-3 backdrop-blur-xl ${tone(Number(value))}`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em]">
                  {name}
                </p>
                <p className="mt-1 text-2xl font-black">{value}%</p>
              </div>
            ))}

            {/* legend */}
            <div className="absolute right-5 bottom-5 rounded-2xl border border-cyan-500/20 bg-slate-950/85 px-4 py-3 backdrop-blur-xl">
              <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-slate-400">
                Density
              </p>

              <div className="flex gap-3 text-[10px] font-bold uppercase">
                <span className="text-emerald-300">Low</span>
                <span className="text-amber-300">Med</span>
                <span className="text-rose-300">High</span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>

    {/* Threat index */}
    <div className="rounded-[2rem] border border-rose-400/25 bg-rose-950/20 p-6 shadow-[0_0_70px_rgba(248,113,113,0.12)] backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.35em] text-rose-300">
        Threat Index
      </p>

      <div className="relative mt-6 flex h-48 items-center justify-center">
        <div className="absolute h-44 w-44 rounded-full border border-rose-300/15" />
        <div className="absolute h-36 w-36 rounded-full border border-rose-300/25 bg-rose-400/10 shadow-[0_0_55px_rgba(251,113,133,0.16)]" />
        <div className="absolute h-24 w-24 rounded-full bg-rose-400/10 blur-xl" />

        <div className="relative text-center">
          <p className="text-7xl font-black text-white">
            {event.riskScore}
          </p>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-rose-300">
            /10
          </p>
        </div>
      </div>

      <p className="text-center text-xl font-black uppercase text-rose-300">
        {riskLevel} Risk
      </p>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-rose-950">
        <div
          className="h-full rounded-full bg-gradient-to-r from-rose-500 via-red-400 to-orange-300 shadow-[0_0_20px_rgba(251,113,133,0.35)]"
          style={{
            width: `${event.riskScore * 10}%`,
          }}
        />
      </div>

      <div className="mt-7 space-y-3">
        {[
          ["Active Incidents", activeIncidents.length],
          ["Risk Zones", event.hotspots.length],
          ["Security Posture", event.riskScore >= 8 ? "Elevated" : "Ready"],
          ["Medical Response", event.riskScore >= 8 ? "Standby" : "Ready"],
        ].map(([label, value]) => (
          <div
            key={String(label)}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 transition-all duration-300 hover:border-rose-300/25 hover:bg-rose-400/10"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
              {label}
            </p>

            <p className="font-black text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
  <section className="mt-8 rounded-3xl border border-cyan-500/20 bg-slate-950/60 p-6 backdrop-blur-xl">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
          Operations Agent
        </p>
        <h2 className="mt-2 text-4xl font-black tracking-tight">
  AI Command Briefing
</h2>

<p className="mt-2 text-slate-400 max-w-2xl">
  Gemini-generated operational assessment for the active World Cup fixture.
</p>
      </div>

      <button
        onClick={runOperationsAgent}
        disabled={runningAgent}
       className="
rounded-2xl
border
border-cyan-300/30
bg-cyan-300/10
px-6
py-3
font-black
uppercase
tracking-[0.18em]
text-cyan-300
transition-all
duration-300
hover:scale-[1.03]
hover:border-cyan-300/50
hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]
"
      >
        {runningAgent ? "Running..." : "Run Operations Agent"}
      </button>
    </div>

    {agentDecision && (
     <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="rounded-2xl bg-slate-900/70 p-5">
          <p className="text-cyan-300 font-bold">Executive Summary</p>
          <p className="mt-2 text-slate-300">{agentDecision.executiveSummary}</p>
        </div>

        <div className="rounded-2xl bg-slate-900/70 p-5">
          <p className="text-red-300 font-bold">Risk Assessment</p>
          <p className="mt-2 text-slate-300">{agentDecision.riskAssessment}</p>
        </div>

        <div className="rounded-2xl bg-slate-900/70 p-5">
          <p className="text-yellow-300 font-bold">Immediate Actions</p>
          <ul className="mt-2 space-y-2 text-slate-300">
            {agentDecision.immediateActions.map((action: string) => (
              <li key={action}>• {action}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-slate-900/70 p-5">
          <p className="text-green-300 font-bold">Resource Allocation</p>
          <p className="mt-2 text-slate-300">
            Security: {agentDecision.resourceAllocation.security}
          </p>
          <p className="text-slate-300">
            Medical: {agentDecision.resourceAllocation.medical}
          </p>
          <p className="text-slate-300">
            Transit: {agentDecision.resourceAllocation.transit}
          </p>
         <div className="mt-5">
  <div className="flex items-center justify-between">
    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
      AI Confidence
    </span>

    <span className="font-black text-cyan-300">
      {agentDecision.confidence}
    </span>
  </div>

  <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-900">
    <div
      className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300"
      style={{
        width:
          agentDecision.confidence === "High"
            ? "92%"
            : agentDecision.confidence === "Medium"
            ? "74%"
            : "48%",
      }}
    />
  </div>
</div>
        </div>
      </div>
    )}
    {matchedMemories.length > 0 && (
    <div className="mt-8 rounded-3xl border border-emerald-500/30 bg-emerald-950/10 p-6 shadow-[0_0_50px_rgba(16,185,129,0.12)]">
      <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">
        Prior Match Intelligence
      </p>

      <h3 className="mt-2 text-2xl font-black">
        Similar Operations Retrieved from Elastic
      </h3>

      <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
        {matchedMemories.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl border border-emerald-500/20 bg-slate-900/70 p-4"
          >
            <p className="text-sm font-bold text-emerald-300">
              {item.match}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {item.stadium}
            </p>

            <p className="mt-3 text-sm text-slate-300 line-clamp-3">
              {item.decision?.immediateActions?.[0] ||
                item.decision?.executiveSummary}
            </p>

            <p className="mt-3 text-xs font-bold text-cyan-300">
              Used by Gemini for this decision
            </p>
          </div>
        ))}
      </div>
    </div>
  )}
    {agentDecision && (
    <div className="mt-8">
      <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
        Command Directives
      </p>

      <h3 className="mt-2 text-2xl font-black">
        Ready for Execution
      </h3>

      <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-5">
        {agentDecision.immediateActions.slice(0, 3).map(
          (action: string, index: number) => (
            <div
              key={action}
              className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-950/70 p-5 shadow-[0_0_45px_rgba(34,211,238,0.08)]"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />

              <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">
                Priority {index + 1}
              </p>

              <h4 className="mt-4 text-xl font-black text-white">
                {index === 0
                  ? "Crowd Flow Control"
                  : index === 1
                  ? "Resource Deployment"
                  : "Transit Coordination"}
              </h4>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                {action}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
                <span className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  Owner
                </span>

                <span className="text-sm font-bold text-cyan-300">
                  {index === 0
                    ? "Security Ops"
                    : index === 1
                    ? "Field Command"
                    : "Transit Ops"}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  Status
                </span>

                <span className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-black uppercase text-green-300">
                  Ready
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )}


    {agentDecision && (
      <div className="mt-8 rounded-3xl border border-cyan-500/20 bg-slate-950/60 p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
          Agent Execution Plan
        </p>

        <h3 className="mt-2 text-2xl font-black">
          Command Timeline
        </h3>

        <div className="mt-6 space-y-5">
          {[
            ["T+00", "Decision generated", "Agent completed risk analysis and created response plan."],
            ["T+03", "Security deployment", `Deploy ${agentDecision.resourceAllocation.security} to concourse pressure zones.`],
            ["T+07", "Medical readiness", `Place ${agentDecision.resourceAllocation.medical} on standby near high-density areas.`],
            ["T+10", "Transit coordination", `Coordinate ${agentDecision.resourceAllocation.transit} for fan movement control.`],
            ["T+20", "Reassess density", "Recheck crowd heatmap and update command posture."],
          ].map(([time, title, detail]) => (
            <div key={time} className="relative flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
                <div className="mt-2 h-full w-px bg-cyan-500/20" />
              </div>

              <div className="pb-4">
                <p className="text-sm font-black text-cyan-300">{time}</p>
                <h4 className="mt-1 font-bold text-white">{title}</h4>
                <p className="mt-1 text-sm text-slate-400">{detail}</p>
              </div>
            </div>
          ))}
          {agentMemory.length > 0 && (
    <div className="mt-8 rounded-3xl border border-purple-500/20 bg-slate-950/70 p-6">
      <p className="text-xs uppercase tracking-[0.35em] text-purple-300">
        Elastic Agent Memory
      </p>

      <h3 className="mt-2 text-2xl font-black">
        Previous Gemini Decisions
      </h3>

      <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
        {agentMemory.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl border border-cyan-500/10 bg-slate-900/70 p-4"
          >
            <p className="text-sm font-bold text-cyan-300">{item.match}</p>
            <p className="mt-1 text-xs text-slate-500">{item.stadium}</p>

            <p className="mt-3 text-sm text-slate-300 line-clamp-3">
              {item.decision?.executiveSummary}
            </p>

            <p className="mt-3 text-xs font-bold text-purple-300">
              Stored in Elastic
            </p>
          </div>
        ))}
      </div>
    </div>
  )}
        </div>
      </div>
    )}
    {agentDecision?.geminiNarrative && (
    <div className="
mt-8
overflow-hidden
rounded-[2rem]
border
border-purple-500/30
bg-gradient-to-br
from-purple-950/40
to-slate-950/80
p-7
shadow-[0_0_80px_rgba(168,85,247,0.18)]
backdrop-blur-xl
">
      <p className="text-xs uppercase tracking-[0.35em] text-purple-300">
        Google Gemini Operations Agent
      </p>

      <h3 className="mt-2 text-2xl font-black">
       AI OPERATIONS NARRATIVE
      </h3>

      <p className="mt-5 leading-8 text-slate-300">
        {agentDecision.geminiNarrative}
      </p>

      <div className="mt-6 rounded-2xl border border-purple-400/20 bg-slate-950/70 p-5">
        <p className="text-sm font-bold text-purple-300">
          Gemini Recommendation
        </p>

        <p className="mt-2 text-slate-300">
          {agentDecision.immediateActions?.[0]}
        </p>
      </div>
    </div>
  )}
  </section>

        

          <OperationsStatusBoard
            hotspots={event.hotspots}
            riskScore={event.riskScore}
            attendance={event.attendance}
            rivalryLevel={event.rivalryLevel}
            transitLoad={event.transitLoad}
          />
          

          <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
  <RiskTrendChart baseRisk={event.riskScore} match={event.match} />
  <WeatherCard selectedMatch={selectedMatch} />

  <div className="xl:col-span-2">
    <LiveIncidentFeed incidents={activeIncidents} />
  </div>
</div>

          <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">


              

              {aiIncident && (
                <div className="mt-4 rounded-xl border border-red-700 bg-red-950/40 p-4">
                  <p className="text-red-300 uppercase text-sm">
                    {aiIncident.level}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">
                    {aiIncident.location}
                  </h3>
                  <p className="mt-2 text-slate-300">{aiIncident.message}</p>
                  <p className="mt-2 text-cyan-300">
                    Recommended Action: {aiIncident.action}
                  </p>
                </div>
              )}
            

            <div className="xl:col-span-2">
              <AIIncidentTimeline incident={aiIncident} />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CommandActionPlan
              riskLevel={riskLevel}
              riskScore={event.riskScore}
            />

            <ResourceAllocationPanel riskScore={event.riskScore} />
          </div>

         <section className="relative mt-10 overflow-hidden rounded-[2.5rem] border border-cyan-300/20 bg-[#030712]/95 p-7 shadow-[0_0_120px_rgba(34,211,238,0.10)]">
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
    <div className="absolute right-[-120px] top-[-80px] h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-3xl" />
    <div className="absolute bottom-[-140px] left-[35%] h-[360px] w-[360px] rounded-full bg-emerald-500/8 blur-3xl" />
    <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:54px_54px]" />
  </div>

  <div className="relative z-10 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
    <div>
      <p className="text-xs uppercase tracking-[0.45em] text-cyan-300">
        AI Operations Brief
      </p>

      <h2 className="mt-2 text-4xl font-black tracking-tight text-white">
        CrowdMind Situation Report
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
        Gemini-generated matchday assessment with predicted operational impact,
        priority actions, and Elastic memory persistence.
      </p>
    </div>

    <button
      onClick={saveReport}
      className="group relative overflow-hidden rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-cyan-200 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-cyan-300/15 hover:shadow-[0_0_35px_rgba(34,211,238,0.22)]"
    >
      <span className="relative z-10">Store Elastic Memory</span>
      <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
    </button>
  </div>

  <div className="relative z-10 mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
    <div className="rounded-[2rem] border border-cyan-300/15 bg-white/[0.035] p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">
            Executive Summary
          </p>

          <h3 className="mt-2 text-2xl font-black text-white">
            Command Intelligence
          </h3>
        </div>

        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
          Elastic Ready
        </span>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-300">
        {report.summary}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
            Impact Items
          </p>
          <p className="mt-2 text-3xl font-black text-cyan-300">
            {report.impact.length}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/10 p-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
            Actions
          </p>
          <p className="mt-2 text-3xl font-black text-emerald-300">
            {report.priorityActions.length}
          </p>
        </div>

        <div className="rounded-2xl border border-fuchsia-300/15 bg-fuchsia-300/10 p-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
            Confidence
          </p>
          <p className="mt-2 text-3xl font-black text-fuchsia-300">
            94%
          </p>
        </div>
      </div>
    </div>

    <div className="rounded-[2rem] border border-rose-300/15 bg-rose-300/10 p-6">
      <p className="text-[10px] uppercase tracking-[0.35em] text-rose-300">
        Predicted Impact
      </p>

      <div className="mt-5 space-y-3">
        {report.impact.map((item: string, index: number) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-rose-300/25 hover:bg-rose-300/10"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-rose-300/25 bg-rose-300/10 text-sm font-black text-rose-300">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="text-sm font-semibold leading-6 text-slate-200">
                {item}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  <div className="relative z-10 mt-6 rounded-[2rem] border border-emerald-300/15 bg-emerald-300/10 p-6">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.35em] text-emerald-300">
          Priority Command Actions
        </p>

        <h3 className="mt-2 text-2xl font-black text-white">
          Recommended Response Plan
        </h3>
      </div>

      <span className="hidden rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-cyan-300 md:inline-flex">
        Ready for Dispatch
      </span>
    </div>

    <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
      {report.priorityActions.map((action: string, index: number) => (
        <div
          key={action}
          className="group rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/25 hover:bg-emerald-300/10"
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
              Action {String(index + 1).padStart(2, "0")}
            </span>

            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
          </div>

          <p className="mt-4 text-sm font-black leading-6 text-white">
            {action}
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            Recommended for immediate command review and Elastic memory logging.
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

          <ScenarioSimulator
            baseAttendance={event.attendance}
            weather={event.weather}
            rivalryLevel={event.rivalryLevel}
            transitLoad={event.transitLoad}
          />

          
          <MultiAgentPanel event={event} />

        </div>
      </main>
    );
  }