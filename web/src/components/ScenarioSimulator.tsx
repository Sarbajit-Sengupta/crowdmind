"use client";

import { useState } from "react";
import { calculateRisk, getRiskLevel } from "@/src/lib/riskEngine";

type Props = {
  baseAttendance: number;
  weather: string;
  rivalryLevel: "low" | "medium" | "high";
  transitLoad: "low" | "medium" | "high";
};

export default function ScenarioSimulator({
  baseAttendance,
  weather,
  rivalryLevel,
  transitLoad,
}: Props) {
  const [attendance, setAttendance] = useState(baseAttendance);

  const simulatedRisk = calculateRisk({
    attendance,
    weather,
    rivalryLevel,
    transitLoad,
    pastIncidents: 3,
  });

  return (
    <section className="mt-8 rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <h2 className="text-2xl font-bold mb-4">Scenario Simulator</h2>

      <p className="text-slate-400 mb-4">
        Test how crowd risk changes as attendance increases.
      </p>

      <label className="block mb-2 text-slate-300">
        Attendance: {attendance.toLocaleString()}
      </label>

      <input
        type="range"
        min="50000"
        max="95000"
        step="1000"
        value={attendance}
        onChange={(e) => setAttendance(Number(e.target.value))}
        className="w-full"
      />

      <div className="mt-5 rounded-xl bg-red-950/60 border border-red-800 p-4">
        <p className="text-red-300">Simulated Risk</p>
        <p className="text-3xl font-bold">
          {simulatedRisk}/10 — {getRiskLevel(simulatedRisk)} Risk
        </p>
      </div>
    </section>
  );
}