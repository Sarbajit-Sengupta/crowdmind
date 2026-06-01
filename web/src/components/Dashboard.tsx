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

export default function Dashboard() {
  const [selectedMatch, setSelectedMatch] =
    useState<MatchKey>("argentinaBrazil");

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
  const report = generateSituationReport(event, riskLevel);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold">CrowdMind</h1>

      <p className="mt-3 text-slate-300">
        World Cup Crowd Intelligence Agent
      </p>

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

      <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-slate-400">Match</p>
          <h2 className="text-2xl font-bold">{event.match}</h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-slate-400">Venue</p>
          <h2 className="text-2xl font-bold">{event.stadium}</h2>
        </div>

        <div className="rounded-2xl bg-red-950 p-6">
          <p className="text-red-300">Risk Score</p>
          <h2 className="text-4xl font-bold">{event.riskScore}/10</h2>
          <p className="mt-2 text-red-200 font-medium">{riskLevel} Risk</p>
        </div>
      </section>
      <section className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
  <div className="rounded-xl bg-slate-900 p-4">
    <p className="text-slate-400 text-sm">Active Incidents</p>
    <h3 className="text-3xl font-bold">{activeIncidents.length}</h3>
  </div>

  <div className="rounded-xl bg-slate-900 p-4">
    <p className="text-slate-400 text-sm">Hotspots</p>
    <h3 className="text-3xl font-bold">{event.hotspots.length}</h3>
  </div>

  <div className="rounded-xl bg-slate-900 p-4">
    <p className="text-slate-400 text-sm">Attendance</p>
    <h3 className="text-3xl font-bold">
      {Math.round(event.attendance / 1000)}k
    </h3>
  </div>

  <div className="rounded-xl bg-slate-900 p-4">
    <p className="text-slate-400 text-sm">Risk Level</p>
    <h3 className="text-3xl font-bold text-red-400">
      {riskLevel}
    </h3>
  </div>
</section>

    

      <section className="mt-8 rounded-2xl bg-slate-900 p-6">
        <h2 className="text-2xl font-bold mb-4">Why CrowdMind Flagged This Risk</h2>
        <ul className="space-y-3">
          {riskReasons.map((reason) => (
            <li key={reason} className="bg-slate-800 rounded-xl p-3">
              ✓ {reason}
            </li>
          ))}
        </ul>
      </section>
      
     <section className="mt-8 rounded-2xl bg-slate-900 p-6">
  <h2 className="text-2xl font-bold mb-4">Detected Hotspots</h2>

  {event.hotspots.map((spot) => (
    <p key={spot} className="bg-slate-800 rounded-xl p-3 mb-2">
      ⚠️ {spot}
    </p>
  ))}
</section>

<RiskMap hotspots={event.hotspots} />
      <section className="mt-8 rounded-2xl bg-slate-900 p-6">
        <h2 className="text-2xl font-bold mb-4">Historical Memory</h2>
        {historicalIncidents.map((incident) => (
          <div key={`${incident.year}-${incident.location}`} className="rounded-xl bg-slate-800 p-4 mb-3">
            <p className="font-bold">{incident.year} • {incident.location}</p>
            <p className="text-slate-300">{incident.issue}</p>
            <p className="text-cyan-300">Recommended Action: {incident.action}</p>
          </div>
        ))}
      </section>
      <LiveIncidentFeed incidents={activeIncidents} />
      <section className="mt-8 rounded-2xl bg-slate-900 p-6">
        <h2 className="text-2xl font-bold mb-4">Agent Recommendations</h2>
        {event.recommendations.map((rec) => (
          <p key={rec} className="bg-slate-800 rounded-xl p-3 mb-2">
            ✅ {rec}
          </p>
        ))}
      </section>

      <section className="mt-8 rounded-2xl bg-cyan-950 border border-cyan-800 p-6">
        <h2 className="text-2xl font-bold mb-4">CrowdMind Situation Report</h2>
        <p className="text-cyan-100 mb-4">{report.summary}</p>

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
<section className="mt-8 rounded-2xl bg-slate-900 p-6">
  <h2 className="text-2xl font-bold mb-4">Scenario Simulator</h2>

  <p className="text-slate-400 mb-4">
    Test how crowd risk changes if attendance increases.
  </p>

  <div className="mt-4 rounded-xl bg-red-950 p-4">
    <p className="text-red-300">Simulated Risk</p>
    <p className="text-3xl font-bold">
      {event.riskScore}/10 — {riskLevel}
    </p>
  </div>
</section>  
      <CopilotBox event={event} riskLevel={riskLevel} />
    </main>
  );
}