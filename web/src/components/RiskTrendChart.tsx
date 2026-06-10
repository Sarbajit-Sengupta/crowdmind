"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

type Props = {
  baseRisk: number;
  match: string;
};

export default function RiskTrendChart({
  baseRisk,
  match,
}: Props) {
  const data = [
    { time: "T-120", risk: Math.max(baseRisk - 3, 1) },
    { time: "T-90", risk: Math.max(baseRisk - 2, 1) },
    { time: "T-60", risk: Math.max(baseRisk - 1.5, 1) },
    { time: "T-30", risk: Math.max(baseRisk - 0.8, 1) },
    { time: "Kickoff", risk: baseRisk },
    { time: "HT", risk: Math.min(baseRisk + 0.4, 10) },
    { time: "FT", risk: Math.min(baseRisk + 0.8, 10) },
  ];
  const stability = Math.max(52, Math.min(96, Math.round(108 - baseRisk * 7)));
  return (
    <section className="relative mt-10 overflow-hidden rounded-[2.5rem] border border-cyan-300/15 bg-[#030712]/95 p-7 shadow-[0_0_100px_rgba(34,211,238,0.08)]">
      {/* background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-120px] top-[-50px] h-[340px] w-[340px] rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:52px_52px]" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-cyan-300">
              Matchday Forecast Engine
            </p>

            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Risk Trend Analysis
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Projected operational risk trajectory from pre-match ingress
              through full-time.
            </p>
          </div>

          <div className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
            {match}
          </div>
        </div>

        {/* top stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
              Peak Risk
            </p>

            <p className="mt-2 text-3xl font-black text-cyan-300">
              {Math.min(baseRisk + 0.8, 10).toFixed(1)}
            </p>
          </div>

          <div className="rounded-2xl border border-fuchsia-300/15 bg-fuchsia-300/10 p-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
              Kickoff Risk
            </p>

            <p className="mt-2 text-3xl font-black text-fuchsia-300">
              {baseRisk}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/10 p-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
              Stability
            </p>

            <p className="mt-2 text-3xl font-black text-emerald-300">
  {stability}%
</p>
          </div>

          <div className="rounded-2xl border border-amber-300/15 bg-amber-300/10 p-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
              Forecast Window
            </p>

            <p className="mt-2 text-3xl font-black text-amber-300">
              120m
            </p>
          </div>
        </div>

        {/* chart */}
        <div className="mt-8 rounded-[2rem] border border-white/10 bg-slate-950/70 p-5">
          <div className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient
                    id="riskGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#22d3ee"
                      stopOpacity={0.45}
                    />
                    <stop
                      offset="100%"
                      stopColor="#22d3ee"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="rgba(255,255,255,0.08)"
                  strokeDasharray="4 4"
                />

                <XAxis
                  dataKey="time"
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  domain={[0, 10]}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#020617",
                    border: "1px solid rgba(34,211,238,0.25)",
                    borderRadius: "16px",
                    color: "#fff",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="risk"
                  stroke="none"
                  fill="url(#riskGradient)"
                />

                <Line
                  type="monotone"
                  dataKey="risk"
                  stroke="#22d3ee"
                  strokeWidth={4}
                  dot={{
                    r: 6,
                    fill: "#22d3ee",
                    strokeWidth: 3,
                    stroke: "#030712",
                  }}
                  activeDot={{
                    r: 9,
                    fill: "#67e8f9",
                    strokeWidth: 3,
                    stroke: "#030712",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* timeline footer */}
        <div className="mt-7 grid grid-cols-4 gap-3">
          {[
            "Ingress Build-Up",
            "Transit Surge",
            "Kickoff Peak",
            "Post-Match Flow",
          ].map((phase) => (
            <div
              key={phase}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-300">
                {phase}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}