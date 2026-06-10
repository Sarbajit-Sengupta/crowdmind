export default function WorldCupBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-slate-950">
      {/* Stadium floodlight beams */}
      <div className="absolute -left-40 -top-20 h-[520px] w-[900px] rotate-12 bg-[conic-gradient(from_80deg,transparent,rgba(34,211,238,0.35),transparent_35%)] blur-2xl" />

      <div className="absolute -right-40 -top-20 h-[520px] w-[900px] -rotate-12 bg-[conic-gradient(from_260deg,transparent,rgba(96,165,250,0.35),transparent_35%)] blur-2xl" />

      {/* Bright floodlight sources */}
     <div className="absolute -left-10 top-10 h-44 w-44 rounded-full bg-cyan-300/35 blur-[90px]" />

<div className="absolute -right-10 top-10 h-44 w-44 rounded-full bg-blue-300/35 blur-[90px]" />

      {/* Stadium night atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.10),transparent_45%)]" />

      {/* Subtle pitch grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Pitch geometry */}
      <div className="absolute left-1/2 top-[18%] h-[420px] w-[820px] -translate-x-1/2 rounded-full border border-cyan-400/10" />
      <div className="absolute left-1/2 top-[27%] h-[240px] w-[480px] -translate-x-1/2 rounded-full border border-green-400/10" />

      {/* Premium labels */}
      <div className="absolute left-[8%] top-[22%] text-xs tracking-[0.5em] text-cyan-300/20">
        FIFA WORLD CUP 2026
      </div>

      <div className="absolute right-[10%] bottom-[18%] text-xs tracking-[0.5em] text-green-300/20">
        STADIUM OPERATIONS
      </div>

      {/* Broadcast scan line */}
      <div className="absolute left-[-20%] top-[38%] h-px w-[140%] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
      {/* Host city operations network */}
<div className="absolute inset-0 opacity-30">
  <svg
    className="absolute left-1/2 top-[18%] h-[520px] w-[900px] -translate-x-1/2"
    viewBox="0 0 900 520"
    fill="none"
  >
    <path
      d="M120 260 C260 120, 390 130, 520 250 S720 380, 800 210"
      stroke="rgba(34,211,238,0.22)"
      strokeWidth="1"
      strokeDasharray="8 10"
    />

    <path
      d="M180 360 C330 250, 480 290, 660 140"
      stroke="rgba(16,185,129,0.18)"
      strokeWidth="1"
      strokeDasharray="6 12"
    />

    {[
      [120, 260, "NYC"],
      [300, 160, "DAL"],
      [520, 250, "LA"],
      [800, 210, "TOR"],
      [180, 360, "MEX"],
      [660, 140, "VAN"],
    ].map(([x, y, label]) => (
      <g key={label}>
        <circle
          cx={x}
          cy={y}
          r="5"
          fill="rgba(34,211,238,0.65)"
        />
        <circle
          cx={x}
          cy={y}
          r="14"
          stroke="rgba(34,211,238,0.18)"
        />
        <text
          x={Number(x) + 12}
          y={Number(y) + 4}
          fill="rgba(165,243,252,0.45)"
          fontSize="11"
          letterSpacing="3"
        >
          {label}
        </text>
      </g>
    ))}
  </svg>
</div>
      {/* Dark readability layer */}
      <div className="absolute inset-0 bg-slate-950/25" />
    </div>
  );
}