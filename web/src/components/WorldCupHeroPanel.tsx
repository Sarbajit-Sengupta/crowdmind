export default function WorldCupHeroPanel() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-slate-950/70 p-6 min-h-[520px] shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,211,238,0.22),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.16),transparent_35%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <div className="relative z-10">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">
          FIFA World Cup 2026
        </p>

        <h2 className="mt-4 text-4xl font-black">
          Stadium Intelligence Layer
        </h2>

        <p className="mt-3 text-slate-300">
          Live crowd risk, fan movement, and emergency response monitoring.
        </p>

        <div className="mt-10 flex justify-center">
          <div className="relative h-64 w-64 rounded-full border border-cyan-400/30 bg-cyan-500/10 shadow-[0_0_80px_rgba(34,211,238,0.25)]">
            <div className="absolute inset-6 rounded-full border border-green-400/20" />
            <div className="absolute inset-12 rounded-full border border-blue-400/20" />

            <div className="absolute inset-0 flex items-center justify-center text-8xl">
              ⚽
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-slate-900/70 p-3 border border-slate-700">
            <p className="text-xs text-slate-400">Host</p>
            <p className="font-bold text-cyan-300">USA</p>
          </div>

          <div className="rounded-xl bg-slate-900/70 p-3 border border-slate-700">
            <p className="text-xs text-slate-400">Host</p>
            <p className="font-bold text-green-300">Mexico</p>
          </div>

          <div className="rounded-xl bg-slate-900/70 p-3 border border-slate-700">
            <p className="text-xs text-slate-400">Host</p>
            <p className="font-bold text-red-300">Canada</p>
          </div>
        </div>
      </div>
    </section>
  );
}