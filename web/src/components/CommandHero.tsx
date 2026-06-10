export default function CommandHero() {
  return (
    <section className="relative mb-12 min-h-[620px] overflow-hidden rounded-[2.5rem] border border-cyan-300/25 bg-[#020617] p-10 shadow-[0_0_140px_rgba(34,211,238,0.18)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_25%_80%,rgba(168,85,247,0.22),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.20),transparent_30%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.045)_1px,transparent_1px)] bg-[size:64px_64px] opacity-70" />

      <div className="absolute left-1/2 top-[54%] h-[440px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-cyan-300/20 bg-cyan-300/[0.03] shadow-[0_0_90px_rgba(34,211,238,0.2)]" />
      <div className="absolute left-1/2 top-[54%] h-[310px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-purple-300/20" />
      <div className="absolute left-1/2 top-[54%] h-[180px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-emerald-300/20" />

      <div className="absolute left-1/2 top-[55%] h-44 w-[430px] -translate-x-1/2 -translate-y-1/2 rotate-x-12 rounded-[2rem] border border-cyan-300/35 bg-gradient-to-br from-cyan-300/10 via-slate-950/80 to-purple-400/10 shadow-[0_0_80px_rgba(34,211,238,0.28)]">
        <div className="absolute inset-8 rounded-xl border border-emerald-300/30" />
        <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/35" />
        <div className="absolute left-8 top-1/2 h-20 w-10 -translate-y-1/2 border border-emerald-300/25" />
        <div className="absolute right-8 top-1/2 h-20 w-10 -translate-y-1/2 border border-emerald-300/25" />
      </div>

      <div className="absolute left-[18%] top-[30%] rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 shadow-[0_0_45px_rgba(248,113,113,0.24)]">
        <p className="text-[10px] uppercase tracking-[0.25em] text-red-200">Gate A</p>
        <p className="text-2xl font-black text-red-300">84%</p>
      </div>

      <div className="absolute right-[18%] top-[34%] rounded-2xl border border-yellow-400/40 bg-yellow-500/10 px-4 py-3 shadow-[0_0_45px_rgba(250,204,21,0.18)]">
        <p className="text-[10px] uppercase tracking-[0.25em] text-yellow-200">
          East Rail
        </p>
        <p className="text-2xl font-black text-yellow-300">77%</p>
      </div>

      <div className="absolute bottom-[18%] left-[24%] rounded-2xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-3 shadow-[0_0_45px_rgba(34,211,238,0.20)]">
        <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-200">
          Food Court
        </p>
        <p className="text-2xl font-black text-cyan-300">64%</p>
      </div>

      <div className="relative z-10 grid min-h-[540px] items-center gap-10 xl:grid-cols-[1fr_460px]">
        <div className="max-w-5xl">
          <p className="text-xs uppercase tracking-[0.65em] text-cyan-300">
            CrowdMind Command OS
          </p>

          <h2 className="mt-6 text-6xl font-black leading-[0.9] tracking-tight text-white md:text-8xl">
            Stadium
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-300 bg-clip-text text-transparent">
              Digital Twin
            </span>
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            A Gemini-powered 3D command layer for World Cup crowd operations,
            fused with Elastic memory, live risk signals, and predictive
            response intelligence.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Gemini Commander", "Elastic Memory", "Live Risk Engine"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-5 py-3 text-sm font-black text-cyan-200"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-[inset_0_0_60px_rgba(255,255,255,0.04)] backdrop-blur-2xl">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Command Core
          </p>

          <div className="mt-6 space-y-4">
            {[
              ["AI Command", "ACTIVE", "text-emerald-300"],
              ["Crowd Risk", "10/10", "text-red-300"],
              ["Memory Sync", "ONLINE", "text-purple-300"],
              ["Response Mode", "AUTONOMOUS", "text-cyan-300"],
            ].map(([label, value, color]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  {label}
                </p>
                <p className={`mt-2 text-2xl font-black ${color}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}