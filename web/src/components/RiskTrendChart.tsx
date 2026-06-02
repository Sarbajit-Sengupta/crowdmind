"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  baseRisk: number;
  match: string;
};

export default function RiskTrendChart({ baseRisk, match }: Props) {
  const data = [
    { time: "T-120", risk: Math.max(baseRisk - 3, 1) },
    { time: "T-90", risk: Math.max(baseRisk - 2, 1) },
    { time: "T-60", risk: Math.max(baseRisk - 1.5, 1) },
    { time: "T-30", risk: Math.max(baseRisk - 0.8, 1) },
    { time: "Kickoff", risk: baseRisk },
    { time: "HT", risk: Math.min(baseRisk + 0.4, 10) },
    { time: "FT", risk: Math.min(baseRisk + 0.8, 10) },
  ];

  return (
    <section className="mt-8 rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Risk Trend Analysis</h2>
        <span className="text-xs rounded-full bg-cyan-950 text-cyan-300 px-3 py-1 border border-cyan-700">
          {match}
        </span>
      </div>

      <p className="text-slate-400 mb-4">
        Predicted crowd risk from two hours before kickoff through full-time.
      </p>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis domain={[0, 10]} stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="risk"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}