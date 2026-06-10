"use client";

import type { MatchKey } from "@/src/data/matches";

type Props = {
  selectedMatch: MatchKey;
};

const weatherByMatch: Record<MatchKey, {
  venue: string;
  city: string;
  condition: string;
  temp: string;
  wind: string;
  humidity: string;
  impact: string;
  risk: string;
  rain: number;
  visibility: number;
  surface: number;
  tone: string;
}> = {
  argentinaBrazil: {
    venue: "MetLife Stadium",
    city: "New Jersey, USA",
    condition: "Light Rain",
    temp: "18°C",
    wind: "14 km/h",
    humidity: "72%",
    impact: "Wet concourses may slow entry flow and increase queue pressure.",
    risk: "Medium Impact",
    rain: 68,
    visibility: 82,
    surface: 74,
    tone: "cyan",
  },
  usaMexico: {
    venue: "SoFi Stadium",
    city: "Los Angeles, USA",
    condition: "Clear",
    temp: "24°C",
    wind: "9 km/h",
    humidity: "48%",
    impact: "Clear weather supports faster ingress but high heat may affect crowd comfort.",
    risk: "Low Impact",
    rain: 12,
    visibility: 96,
    surface: 91,
    tone: "emerald",
  },
  englandFrance: {
    venue: "AT&T Stadium",
    city: "Arlington, USA",
    condition: "Humid",
    temp: "27°C",
    wind: "11 km/h",
    humidity: "66%",
    impact: "Humidity increases medical readiness needs and hydration demand.",
    risk: "Moderate Impact",
    rain: 28,
    visibility: 88,
    surface: 84,
    tone: "amber",
  },
};

export default function WeatherCard({ selectedMatch }: Props) {
  const weather = weatherByMatch[selectedMatch];

  const bars = [
    ["Rain Probability", weather.rain, "from-cyan-300 to-blue-400"],
    ["Visibility", weather.visibility, "from-emerald-300 to-teal-400"],
    ["Surface Flow", weather.surface, "from-fuchsia-300 to-purple-400"],
  ];

  return (
    <section className="relative flex h-full min-h-[760px] flex-col overflow-hidden rounded-[2.5rem] border border-cyan-300/15 bg-[#030712]/95 p-7 shadow-[0_0_100px_rgba(34,211,238,0.08)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-80px] bottom-[-80px] h-72 w-72 rounded-full bg-fuchsia-400/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:42px_42px]" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
              Stadium Weather Impact
            </p>
            <h3 className="mt-2 text-3xl font-black text-white">
              {weather.condition}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              {weather.venue} · {weather.city}
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-right">
            <p className="text-4xl font-black text-cyan-300">{weather.temp}</p>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Matchday
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
              Wind
            </p>
            <p className="mt-2 text-xl font-black text-white">{weather.wind}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
              Humidity
            </p>
            <p className="mt-2 text-xl font-black text-white">
              {weather.humidity}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
              Ops Risk
            </p>
            <p className="mt-2 text-sm font-black text-amber-300">
              {weather.risk}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-200">
            Operational Effect
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {weather.impact}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {bars.map(([label, value, gradient]) => (
            <div key={label as string}>
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                  {label}
                </p>
                <p className="text-xs font-black text-white">{value}%</p>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4">
  <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4">
    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
      Gate Flow Impact
    </p>
    <p className="mt-2 text-3xl font-black text-cyan-300">
      {weather.condition === "Clear" ? "Low" : weather.condition === "Humid" ? "Med" : "High"}
    </p>
  </div>

  <div className="rounded-2xl border border-fuchsia-300/15 bg-fuchsia-300/10 p-4">
    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
      Medical Load
    </p>
    <p className="mt-2 text-3xl font-black text-fuchsia-300">
      {weather.condition === "Humid" ? "High" : "Ready"}
    </p>
  </div>
</div>

<div className="mt-6 flex-1 rounded-[2rem] border border-white/10 bg-slate-950/70 p-5">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
        Matchday Weather Command
      </p>
      <p className="mt-2 text-xl font-black text-white">
        Operational Adjustment
      </p>
    </div>

    <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
  </div>

  <div className="mt-5 space-y-4">
    {[
      ["Entry Gates", weather.condition === "Clear" ? "Normal queue posture" : "Increase steward coverage"],
      ["Concourse", weather.condition === "Light Rain" ? "Open covered overflow areas" : "Monitor density pockets"],
      ["Medical", weather.condition === "Humid" ? "Hydration teams on standby" : "Standard readiness"],
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
      </div>
    </section>
  );
}