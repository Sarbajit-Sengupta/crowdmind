type Props = {
  children: React.ReactNode;
};

export default function CommandShell({ children }: Props) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(34,197,94,0.12),transparent_28%)]" />

      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(34,211,238,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.04)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="relative z-10 flex">
        <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-20 flex-col items-center border-r border-cyan-500/10 bg-slate-950/70 backdrop-blur-xl py-6">
          <div className="h-11 w-11 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-black">
            CM
          </div>

          <nav className="mt-10 flex flex-col gap-5 text-slate-400">
            <span className="text-cyan-300">●</span>
            <span>▣</span>
            <span>⚠</span>
            <span>◌</span>
            <span>◎</span>
          </nav>
        </aside>

        <div className="w-full lg:pl-20">
          <header className="sticky top-0 z-30 border-b border-cyan-500/10 bg-slate-950/70 backdrop-blur-2xl">
            <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-4">
              <div>
                <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
                  CrowdMind
                </h1>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  World Cup Operations Command
                </p>
              </div>

              <div className="hidden md:flex rounded-2xl border border-cyan-500/15 bg-slate-900/60 p-1">
                {["Dashboard", "Incidents", "Analytics", "Agents"].map((item) => (
                  <button
                    key={item}
                    className={`rounded-xl px-5 py-2 text-sm font-bold ${
                      item === "Dashboard"
                        ? "bg-cyan-500 text-slate-950"
                        : "text-slate-400"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full border border-green-500/50 bg-green-500/10 px-4 py-2 text-sm font-bold text-green-300">
                  ● LIVE
                </span>
                <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-sm font-bold text-cyan-300">
                  AI ACTIVE
                </span>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1600px] px-8 py-8">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}