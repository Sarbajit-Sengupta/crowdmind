"use client";

import { useState } from "react";
import { matches, MatchKey, MatchData } from "@/src/data/matches";
import { incidents } from "@/src/data/incidents";
import { getRiskLevel } from "@/src/lib/riskEngine";
import { explainRisk } from "@/src/lib/explanationEngine";
import { generateSituationReport } from "@/src/lib/reportEngine";
import CopilotBox from "@/src/components/CopilotBox";
import RiskMap from "@/src/components/RiskMap";
import LiveIncidentFeed from "@/src/components/LiveIncidentFeed";
import { liveIncidents } from "@/src/data/liveIncidents";
import CommandTimeline from "@/src/components/CommandTimeline";
import { timeline } from "@/src/data/timeline";
import ScenarioSimulator from "@/src/components/ScenarioSimulator";
import DataSources from "@/src/components/DataSources";
import MongoArchitecture from "@/src/components/MongoArchitecture";
import WeatherCard from "@/src/components/WeatherCard";
import DemoModeBanner from "@/src/components/DemoModeBanner";
import RiskTrendChart from "@/src/components/RiskTrendChart";
import MultiAgentPanel from "@/src/components/MultiAgentPanel";
import OperationsStatusBoard from "@/src/components/OperationsStatusBoard";


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

  const historicalIncidents =
    incidents[selectedMatch as keyof typeof incidents] || [];

  const activeIncidents =
    liveIncidents[selectedMatch as keyof typeof liveIncidents] || [];

  const timelineEvents =
    timeline[selectedMatch as keyof typeof timeline] || [];

  const report = generateSituationReport(event, riskLevel);

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

    alert("Situation report saved to MongoDB");
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

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 md:p-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
  <div>
    <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
      CrowdMind
    </h1>

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
  </div>
</div>

      <div className="mt-6 h-px bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent" />

      <DemoModeBanner />
       <section className="mt-8">
        <label className="block mb-2 text-slate-400">Select Match</label>
        <select
          value={selectedMatch}
          onChange={(e) => setSelectedMatch(e.target.value as MatchKey)}
          className="rounded-xl bg-slate-900 border border-slate-700 p-4 text-white"
        >
          <option value="argentinaBrazil">Argentina vs Brazil</option>
          <option value="usaMexico">USA vs Mexico</option>
          <option value="englandFrance">England vs France</option>
        </select>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6 mb-8">
      
  <div className="rounded-2xl bg-slate-900 border border-green-500 p-4 shadow-lg">
    <p className="text-sm text-slate-400">Security</p>
    <h3 className="text-xl font-bold text-green-400 mt-2">
      READY
    </h3>
  </div>

  <div className="rounded-2xl bg-slate-900 border border-yellow-500 p-4 shadow-lg">
    <p className="text-sm text-slate-400">Transit</p>
    <h3 className="text-xl font-bold text-yellow-400 mt-2">
      MONITORING
    </h3>
  </div>

  <div className="rounded-2xl bg-slate-900 border border-cyan-500 p-4 shadow-lg">
    <p className="text-sm text-slate-400">Medical</p>
    <h3 className="text-xl font-bold text-cyan-400 mt-2">
      STANDBY
    </h3>
  </div>

  <div className="rounded-2xl bg-slate-900 border border-red-500 p-4 shadow-lg">
    <p className="text-sm text-slate-400">Risk Level</p>
    <h3 className="text-xl font-bold text-red-400 mt-2">
      {riskLevel.toUpperCase()}
    </h3>
  </div>

</section>
<OperationsStatusBoard
  hotspots={event.hotspots}
  riskScore={event.riskScore}
  attendance={event.attendance}
  rivalryLevel={event.rivalryLevel}
  transitLoad={event.transitLoad}
/>

     

      <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-lg">
          <p className="text-slate-400">Match</p>
          <h2 className="mt-2 text-2xl font-bold">{event.match}</h2>
          <p className="mt-3 text-sm text-cyan-300">World Cup 2026 Fixture</p>
        </div>

        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-lg">
          <p className="text-slate-400">Venue</p>
          <h2 className="mt-2 text-2xl font-bold">{event.stadium}</h2>
          <p className="mt-3 text-sm text-cyan-300">Host Operations Zone</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-red-950 p-6 border border-red-800 shadow-lg">
          <div className="absolute right-4 top-4 h-16 w-16 rounded-full bg-red-500/20 blur-xl" />

          <p className="text-red-300">Risk Score</p>

          <h2 className="mt-2 text-5xl font-extrabold">
            {event.riskScore}/10
          </h2>

          <p className="mt-2 text-red-200 font-medium">{riskLevel} Risk</p>

          <div className="mt-4 h-2 rounded-full bg-red-900">
            <div
              className="h-2 rounded-full bg-red-400"
              style={{ width: `${event.riskScore * 10}%` }}
            />
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ["Active Incidents", activeIncidents.length, "text-red-400"],
          ["Hotspots", event.hotspots.length, "text-yellow-300"],
          [
            "Attendance",
            `${Math.round(event.attendance / 1000)}k`,
            "text-cyan-300",
          ],
          ["Risk Level", riskLevel, "text-red-400"],
        ].map(([label, value, color]) => (
          <div
            key={label}
            className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 shadow-lg"
          >
            <p className="text-slate-400 text-sm">{label}</p>
            <h3 className={`mt-2 text-3xl font-bold ${color}`}>{value}</h3>
          </div>
        ))}
      </section>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RiskTrendChart baseRisk={event.riskScore} match={event.match} />
        <WeatherCard />
      </div>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <h2 className="text-2xl font-bold mb-4">
            Why CrowdMind Flagged This Risk
          </h2>

          <ul className="space-y-3">
            {riskReasons.map((reason) => (
              <li key={reason} className="bg-slate-800 rounded-xl p-3">
                ✓ {reason}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <h2 className="text-2xl font-bold mb-4">Detected Hotspots</h2>

          {event.hotspots.map((spot) => (
            <p key={spot} className="bg-slate-800 rounded-xl p-3 mb-2">
              ⚠️ {spot}
            </p>
          ))}
        </section>
      </div>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RiskMap hotspots={event.hotspots} />
        <LiveIncidentFeed incidents={activeIncidents} />
      </div>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <h2 className="text-2xl font-bold mb-4">Historical Memory</h2>

          {historicalIncidents.map((incident) => (
            <div
              key={`${incident.year}-${incident.location}`}
              className="rounded-xl bg-slate-800 p-4 mb-3"
            >
              <p className="font-bold">
                {incident.year} • {incident.location}
              </p>

              <p className="text-slate-300">{incident.issue}</p>

              <p className="text-cyan-300">
                Recommended Action: {incident.action}
              </p>
            </div>
          ))}
        </section>

        <CommandTimeline events={timelineEvents} />
      </div>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <h2 className="text-2xl font-bold mb-4">Agent Recommendations</h2>

          {event.recommendations.map((rec) => (
            <p key={rec} className="bg-slate-800 rounded-xl p-3 mb-2">
              ✅ {rec}
            </p>
          ))}
        </section>

        <section className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">AI Incident Simulator</h2>

            <button
              onClick={generateIncident}
              disabled={generatingIncident}
              className="rounded-xl bg-cyan-500 px-4 py-2 font-bold text-slate-950 disabled:opacity-50"
            >
              {generatingIncident ? "Generating..." : "Generate AI Incident"}
            </button>
          </div>

          {aiIncident && (
            <div className="mt-4 rounded-xl border border-red-700 bg-red-950/40 p-4">
              <p className="text-red-300 uppercase text-sm">
                {aiIncident.level}
              </p>
              <h3 className="mt-2 text-xl font-bold">{aiIncident.location}</h3>
              <p className="mt-2 text-slate-300">{aiIncident.message}</p>
              <p className="mt-2 text-cyan-300">
                Recommended Action: {aiIncident.action}
              </p>
            </div>
          )}
        </section>
      </div>

      <section className="mt-8 rounded-2xl bg-cyan-950 border border-cyan-800 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold">CrowdMind Situation Report</h2>

          <button
            onClick={saveReport}
            className="rounded-xl bg-cyan-500 px-4 py-2 font-bold text-slate-950"
          >
            Save Report to MongoDB
          </button>
        </div>

        <p className="text-cyan-100 mt-4 mb-4">{report.summary}</p>

        <h3 className="font-bold text-cyan-300 mb-2">Predicted Impact</h3>
        <ul className="space-y-2 mb-4">
          {report.impact.map((item: string) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>

        <h3 className="font-bold text-cyan-300 mb-2">Priority Actions</h3>
        <ul className="space-y-2">
          {report.priorityActions.map((action: string) => (
            <li key={action}>✅ {action}</li>
          ))}
        </ul>
      </section>

      <ScenarioSimulator
        baseAttendance={event.attendance}
        weather={event.weather}
        rivalryLevel={event.rivalryLevel}
        transitLoad={event.transitLoad}
      />

      <MongoArchitecture />
      <DataSources />
      <MultiAgentPanel event={event} />
      <CopilotBox event={event} riskLevel={riskLevel} />
    </main>
  );
}