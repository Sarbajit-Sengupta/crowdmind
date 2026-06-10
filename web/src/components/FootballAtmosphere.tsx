export default function FootballAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.08),transparent_35%)]" />

      <div className="absolute left-[-10%] top-[18%] h-[2px] w-[120%] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse" />

      <div className="absolute left-[12%] top-[34%] text-xs tracking-[0.4em] text-cyan-300/20">
        ARGENTINA
      </div>

      <div className="absolute right-[18%] top-[38%] text-xs tracking-[0.4em] text-yellow-300/20">
        BRAZIL
      </div>

      <div className="absolute left-[20%] bottom-[22%] text-xs tracking-[0.4em] text-blue-300/20">
        USA
      </div>

      <div className="absolute right-[14%] bottom-[28%] text-xs tracking-[0.4em] text-green-300/20">
        MEXICO
      </div>

      <div className="absolute bottom-0 left-1/2 h-[420px] w-[80vw] -translate-x-1/2 rounded-t-full border-t border-cyan-400/10" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
    </div>
  );
}