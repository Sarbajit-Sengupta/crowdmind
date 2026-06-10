"use client";


export default function FuturisticCommandHero() {
  const matchSignals = [
    {
      label: "Fixture",
      value: "ARG vs BRA",
      detail: "MetLife Stadium",
      tone: "cyan",
    },
    {
      label: "Attendance",
      value: "82K",
      detail: "Projected crowd load",
      tone: "emerald",
    },
    {
      label: "Rivalry Index",
      value: "Extreme",
      detail: "High emotion fixture",
      tone: "rose",
    },
    {
      label: "Weather",
      value: "Light Rain",
      detail: "Flow friction expected",
      tone: "violet",
    },
  ];

  const predictionCards = [
    {
      label: "Projected Gate Load",
      value: "84%",
      caption: "North Gate pressure before kickoff",
      color: "rose",
    },
    {
      label: "Transit Surge",
      value: "77%",
      caption: "East rail arrival compression",
      color: "amber",
    },
    {
      label: "Concourse Flow",
      value: "64%",
      caption: "Food court circulation pressure",
      color: "cyan",
    },
  ];

  const agentSteps = [
    "Gemini evaluates fixture rivalry, attendance, weather, and stadium profile",
    "Elastic memory retrieves similar future-match preparation patterns",
    "CrowdMind prepares pre-kickoff gate, transit, and staffing recommendations",
  ];

  return (
    <>
      <section className="hero-3d relative mb-10 overflow-hidden rounded-[40px] border border-cyan-300/15 bg-[#030712] px-8 py-10 shadow-[0_0_140px_rgba(34,211,238,0.10)] md:px-10 xl:px-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-28 top-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute right-[-100px] top-[-80px] h-[440px] w-[440px] rounded-full bg-fuchsia-500/14 blur-3xl" />
          <div className="absolute bottom-[-120px] left-[35%] h-[380px] w-[380px] rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:60px_60px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(3,7,18,0.15)_45%,rgba(3,7,18,0.88)_100%)]" />
        </div>

        <div className="scan-line pointer-events-none absolute inset-0" />

        <div className="relative z-10 grid items-center gap-10 xl:grid-cols-[0.95fr_1.05fr]">
          {/* LEFT SIDE */}
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 shadow-[0_0_35px_rgba(217,70,239,0.12)]">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-fuchsia-300 shadow-[0_0_14px_rgba(232,121,249,0.9)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.36em] text-fuchsia-200">
                Gemini x Elastic Command Core
              </span>
            </div>

            <h2 className="mt-7 text-5xl font-black leading-[0.92] tracking-tight text-white md:text-7xl xl:text-[82px]">
              World Cup
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-300 bg-clip-text text-transparent">
                Ops Intelligence
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              A futuristic AI command surface for future World Cup fixtures —
              reading projected crowd density, arrival pressure, weather,
              rivalry intensity, and historical memory before incidents happen.
            </p>

            <div className="mt-8 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
              {[
                ["AI Mode", "ACTIVE", "emerald"],
                ["Risk", "10/10", "rose"],
                ["Memory", "SYNCED", "fuchsia"],
                ["Command", "READY", "cyan"],
              ].map(([label, value, tone]) => (
                <div
                  key={label}
                  className={`metric-card metric-${tone} rounded-2xl border p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(34,211,238,0.12)]`}
                >
                  <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
                    {label}
                  </p>
                  <p className="mt-2 text-2xl font-black">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Gemini Reasoning",
                "Elastic Memory",
                "Pre-Match Simulation",
                "Football Ops Layer",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur transition-all duration-300 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE COMMAND MATRIX */}
          <div className="relative flex min-h-[590px] items-center justify-center">
            <div className="matrix-stage">
              <div className="matrix-glow absolute inset-0 rounded-[38px]" />
              <div className="matrix-backplate absolute inset-0 rounded-[38px]" />

              <div className="matrix-panel absolute inset-4 overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.88))] shadow-[0_45px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_80%_90%,rgba(217,70,239,0.14),transparent_32%)]" />
                  <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(34,211,238,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.9)_1px,transparent_1px)] [background-size:32px_32px]" />
                  <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-cyan-300/10 to-transparent" />
                  <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-fuchsia-400/10 to-transparent" />
                </div>

                <div className="relative z-10 flex h-full flex-col p-6">
                  {/* HEADER */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.42em] text-slate-400">
                        Future Match Command Matrix
                      </p>
                      <h3 className="mt-2 text-3xl font-black text-white">
                        Pre-Kickoff Intelligence
                      </h3>
                    </div>

                    <div className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.26em] text-cyan-300">
                      Simulating
                    </div>
                  </div>

                  {/* FIXTURE STRIP */}
                  <div className="mt-6 rounded-[28px] border border-cyan-300/15 bg-slate-950/70 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-cyan-300/35 hover:shadow-[0_0_45px_rgba(34,211,238,0.10)]">
                    <div className="flex items-center justify-between gap-5">
                      <div className="text-left">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                          Argentina
                        </p>
                        <p className="mt-1 text-5xl font-black text-white">
                          ARG
                        </p>
                      </div>

                      <div className="flex flex-col items-center">
                        <p className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
                          Upcoming Fixture
                        </p>

                        <div className="vs-pod relative mt-5 flex h-16 w-36 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/10 via-fuchsia-300/10 to-cyan-300/10" />
                          <div className="data-pulse absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                          <span className="relative z-10 text-4xl font-black tracking-tight text-cyan-300">
                            VS
                          </span>
                        </div>

                        <p className="mt-3 text-xs font-bold uppercase tracking-[0.28em] text-slate-500">
                          Pre-match risk forecast
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                          Brazil
                        </p>
                        <p className="mt-1 text-5xl font-black text-white">
                          BRA
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SIGNALS */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {matchSignals.map((item) => (
                      <div
                        key={item.label}
                        className={`signal-card signal-${item.tone} rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/[0.07]`}
                      >
                        <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                          {item.label}
                        </p>
                        <p className="mt-2 text-xl font-black text-white">
                          {item.value}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* WORLD CUP BALL PROFILE */}
                  <div className="mt-5 rounded-[28px] border border-amber-300/20 bg-[linear-gradient(135deg,rgba(251,191,36,0.12),rgba(217,70,239,0.08),rgba(34,211,238,0.08))] p-5 transition-all duration-300 hover:border-amber-300/35 hover:shadow-[0_0_45px_rgba(251,191,36,0.10)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-amber-200">
                          Tournament Showcase
                        </p>
                        <p className="mt-1 text-xl font-black text-white">
                          World Cup Match Profile
                        </p>
                      </div>

                      <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs font-bold text-amber-200">
                        Global Event
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-[0.9fr_1.1fr] gap-4">
                    {/* CSS WORLD CUP BALL AREA */}
<div className="ball-card relative overflow-hidden rounded-[26px] border border-amber-300/20 bg-slate-950/70 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.16),transparent_50%)]" />
  <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(251,191,36,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.8)_1px,transparent_1px)] [background-size:24px_24px]" />

  <div className="relative z-10 flex h-full min-h-[210px] flex-col items-center justify-center">
    <div className="ball-stage relative flex h-52 w-52 items-center justify-center">
      <div className="ball-halo absolute inset-0 rounded-full" />
      <div className="ball-ring ball-ring-1 absolute inset-[-12px] rounded-full border border-cyan-300/20" />
      <div className="ball-ring ball-ring-2 absolute inset-[-28px] rounded-full border border-amber-300/20" />

      <div className="css-world-ball">
        <div className="ball-gloss" />
        <div className="ball-shadow" />

        <div className="panel panel-red panel-red-1" />
        <div className="panel panel-red panel-red-2" />

        <div className="panel panel-green panel-green-1" />
        <div className="panel panel-green panel-green-2" />

        <div className="panel panel-blue panel-blue-1" />
        <div className="panel panel-blue panel-blue-2" />

        <div className="panel panel-gold panel-gold-1" />
        <div className="panel panel-gold panel-gold-2" />

        <div className="seam seam-1" />
        <div className="seam seam-2" />
        <div className="seam seam-3" />

        <div className="center-mark" />
      </div>

      <div className="ball-reflection absolute bottom-3 h-7 w-28 rounded-full bg-white/10 blur-md" />
    </div>

    <div className="mt-5 text-center">
      <p className="text-sm font-black uppercase tracking-[0.28em] text-amber-200">
        FIFA World Cup 2026
      </p>
      <p className="mt-1 text-xs text-slate-400">
        AI-generated match atmosphere module
      </p>
    </div>
  </div>
</div>

                      {/* PROFILE CARDS */}
                      <div className="space-y-3">
                        {[
                          [
                            "Host Profile",
                            "Neutral-site World Cup operations environment",
                            "text-cyan-300",
                          ],
                          [
                            "Attention Index",
                            "Global broadcast pressure and fan concentration",
                            "text-amber-300",
                          ],
                          [
                            "Security Tier",
                            "Maximum preparedness for rivalry matchday",
                            "text-rose-300",
                          ],
                        ].map(([title, text, color]) => (
                          <div
                            key={title}
                            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/25 hover:bg-white/[0.07]"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-sm font-black text-white">
                                {title}
                              </p>
                              <span className={`text-xs font-black ${color}`}>
                                ●
                              </span>
                            </div>

                            <p className="mt-1 text-xs leading-5 text-slate-400">
                              {text}
                            </p>
                          </div>
                        ))}

                        <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/10 p-4">
                          <p className="text-[10px] uppercase tracking-[0.26em] text-emerald-200">
                            Operational Status
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <p className="text-lg font-black text-white">
                              Pre-Match Command Ready
                            </p>
                            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.9)]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PREDICTIONS */}
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {predictionCards.map((card) => (
                      <div
                        key={card.label}
                        className={`prediction-card prediction-${card.color} rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]`}
                      >
                        <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                          {card.label}
                        </p>
                        <p className="mt-2 text-2xl font-black text-white">
                          {card.value}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          {card.caption}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* GEMINI READOUT */}
                  <div className="mt-5 rounded-[24px] border border-cyan-400/20 bg-cyan-400/10 p-4 transition-all duration-300 hover:border-cyan-300/35">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-200">
                      Gemini Tactical Readout
                    </p>

                    <div className="mt-3 space-y-2">
                      {agentSteps.map((step, index) => (
                        <div
                          key={step}
                          className="flex items-start gap-3 rounded-xl px-2 py-1 text-sm text-slate-300 transition-all duration-300 hover:bg-white/[0.04]"
                        >
                          <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
                          <span>
                            <span className="font-bold text-cyan-200">
                              0{index + 1}.
                            </span>{" "}
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-x-10 top-0 h-28 rounded-b-[100px] bg-gradient-to-b from-white/12 to-transparent blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-3d {
          isolation: isolate;
        }

        .scan-line::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(34, 211, 238, 0.07) 48%,
            rgba(217, 70, 239, 0.09) 52%,
            transparent 100%
          );
          transform: translateY(-100%);
          animation: sweep 9s linear infinite;
        }

        .metric-card {
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .metric-emerald {
          border-color: rgba(52, 211, 153, 0.22);
          background: rgba(52, 211, 153, 0.08);
          color: rgb(110, 231, 183);
        }

        .metric-rose {
          border-color: rgba(251, 113, 133, 0.22);
          background: rgba(251, 113, 133, 0.08);
          color: rgb(253, 164, 175);
        }

        .metric-fuchsia {
          border-color: rgba(217, 70, 239, 0.22);
          background: rgba(217, 70, 239, 0.08);
          color: rgb(240, 171, 252);
        }

        .metric-cyan {
          border-color: rgba(34, 211, 238, 0.22);
          background: rgba(34, 211, 238, 0.08);
          color: rgb(103, 232, 249);
        }

        .matrix-stage {
          position: relative;
          width: 100%;
          max-width: 680px;
          height: 880px;
          perspective: 1800px;
          transform-style: preserve-3d;
        }

        .matrix-glow {
          background:
            radial-gradient(circle at 30% 20%, rgba(34, 211, 238, 0.24), transparent 34%),
            radial-gradient(circle at 70% 80%, rgba(217, 70, 239, 0.22), transparent 32%);
          filter: blur(30px);
          animation: glowDrift 7s ease-in-out infinite;
        }

        .matrix-backplate {
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.06),
            rgba(255, 255, 255, 0.015)
          );
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 45px 100px rgba(0, 0, 0, 0.45);
          transform: rotateX(8deg) rotateY(-9deg) translateZ(0);
          animation: panelDrift 8s ease-in-out infinite;
        }

        .matrix-panel {
          transform: rotateX(8deg) rotateY(-9deg) translateZ(35px);
          animation: panelDriftInner 8s ease-in-out infinite;
        }

        .vs-pod {
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 24px rgba(34, 211, 238, 0.08);
        }

        .signal-card,
        .prediction-card {
          background: rgba(255, 255, 255, 0.035);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .signal-cyan,
        .prediction-cyan {
          border-color: rgba(34, 211, 238, 0.16);
        }

        .signal-emerald {
          border-color: rgba(52, 211, 153, 0.16);
        }

        .signal-rose,
        .prediction-rose {
          border-color: rgba(251, 113, 133, 0.16);
        }

        .signal-violet {
          border-color: rgba(167, 139, 250, 0.16);
        }

        .prediction-amber {
          border-color: rgba(251, 191, 36, 0.16);
        }

        .ball-card {
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 35px rgba(251, 191, 36, 0.08);
        }

        .ball-stage {
          animation: ballFloat 5.5s ease-in-out infinite;
        }

        .ball-halo {
          background: radial-gradient(
            circle at center,
            rgba(251, 191, 36, 0.26),
            rgba(34, 211, 238, 0.10) 45%,
            transparent 72%
          );
          filter: blur(20px);
        }

        

        .ball-ring {
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.12);
        }

        .ball-ring-1 {
          animation: spinSlow 14s linear infinite;
        }

        .ball-ring-2 {
          animation: spinReverse 18s linear infinite;
        }

        .data-pulse {
          animation: dataPulse 2.8s ease-in-out infinite;
        }

        @keyframes sweep {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes glowDrift {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.03);
          }
        }

        @keyframes panelDrift {
          0%,
          100% {
            transform: rotateX(8deg) rotateY(-9deg) translateZ(0) translateY(0);
          }
          50% {
            transform: rotateX(7deg) rotateY(-7deg) translateZ(8px)
              translateY(-8px);
          }
        }

        @keyframes panelDriftInner {
          0%,
          100% {
            transform: rotateX(8deg) rotateY(-9deg) translateZ(35px)
              translateY(0);
          }
          50% {
            transform: rotateX(7deg) rotateY(-7deg) translateZ(48px)
              translateY(-8px);
          }
        }

        @keyframes dataPulse {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(260%);
          }
        }

        @keyframes ballFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spinReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @media (max-width: 1279px) {
          .matrix-stage {
            max-width: 100%;
            height: 940px;
          }

          .matrix-panel,
          .matrix-backplate {
            transform: none;
            animation: none;
          }
        }

        @media (max-width: 768px) {
          .matrix-stage {
            height: 1040px;
          }
        }
        .css-world-ball {
  position: relative;
  height: 150px;
  width: 150px;
  overflow: hidden;
  border-radius: 999px;
  background:
    radial-gradient(circle at 30% 22%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 18%, rgba(241,245,249,0.97) 38%, rgba(203,213,225,0.96) 62%, rgba(71,85,105,0.96) 100%);
  box-shadow:
    inset -22px -26px 42px rgba(2, 6, 23, 0.52),
    inset 18px 16px 30px rgba(255, 255, 255, 0.82),
    inset 0 0 18px rgba(15, 23, 42, 0.16),
    0 0 42px rgba(251, 191, 36, 0.32),
    0 0 80px rgba(34, 211, 238, 0.14);
  transform-style: preserve-3d;
  animation: ballSpinFloat 7.5s ease-in-out infinite;
}

/* subtle spherical grain / panel texture */
.css-world-ball::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background:
    radial-gradient(circle at 34% 26%, transparent 0 22%, rgba(15,23,42,0.12) 23%, transparent 25%),
    radial-gradient(circle at 70% 66%, transparent 0 20%, rgba(15,23,42,0.13) 21%, transparent 23%),
    radial-gradient(circle at 28% 78%, transparent 0 18%, rgba(15,23,42,0.11) 19%, transparent 21%),
    linear-gradient(135deg, transparent 0 48%, rgba(15,23,42,0.13) 49%, transparent 51%);
  opacity: 0.48;
  mix-blend-mode: multiply;
  z-index: 6;
}

/* outer spherical glass edge */
.css-world-ball::after {
  content: "";
  position: absolute;
  inset: 5px;
  border-radius: inherit;
  border: 1px solid rgba(255, 255, 255, 0.38);
  box-shadow:
    inset 0 0 18px rgba(255, 255, 255, 0.24),
    inset -8px -10px 22px rgba(15, 23, 42, 0.22);
  z-index: 12;
  pointer-events: none;
}

.ball-gloss {
  position: absolute;
  left: 24px;
  top: 17px;
  height: 42px;
  width: 55px;
  border-radius: 999px;
  background:
    radial-gradient(circle at 40% 38%, rgba(255,255,255,0.88), rgba(255,255,255,0.30) 45%, transparent 72%);
  filter: blur(0.8px);
  transform: rotate(-18deg);
  z-index: 20;
}

.ball-shadow {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background:
    radial-gradient(circle at 80% 82%, rgba(2,6,23,0.48), transparent 42%),
    linear-gradient(145deg, transparent 0 55%, rgba(15,23,42,0.24) 100%);
  z-index: 18;
  pointer-events: none;
}

.panel {
  position: absolute;
  z-index: 4;
  overflow: hidden;
  border-radius: 999px;
  opacity: 0.96;
  mix-blend-mode: multiply;
  filter: saturate(1.18) contrast(1.06);
}

.panel::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 30% 25%, rgba(255,255,255,0.42), transparent 45%),
    linear-gradient(135deg, rgba(255,255,255,0.10), transparent 52%, rgba(15,23,42,0.18));
  border-radius: inherit;
}

/* red curved panels */
.panel-red {
  background: linear-gradient(135deg, #ef233c, #f97373 52%, #991b1b);
}

.panel-red-1 {
  left: -22px;
  top: 26px;
  height: 40px;
  width: 105px;
  transform: rotate(-24deg) skewX(-8deg);
  clip-path: polygon(0 18%, 74% 0, 100% 42%, 82% 100%, 8% 84%);
}

.panel-red-2 {
  right: -30px;
  bottom: 30px;
  height: 38px;
  width: 104px;
  transform: rotate(-30deg) skewX(7deg);
  clip-path: polygon(12% 0, 100% 16%, 88% 84%, 10% 100%, 0 44%);
}

/* green curved panels */
.panel-green {
  background: linear-gradient(135deg, #15803d, #22c55e 48%, #064e3b);
}

.panel-green-1 {
  right: -24px;
  top: 27px;
  height: 48px;
  width: 100px;
  transform: rotate(31deg) skewX(8deg);
  clip-path: polygon(16% 0, 100% 24%, 86% 100%, 0 76%);
}

.panel-green-2 {
  left: 25px;
  bottom: -20px;
  height: 52px;
  width: 105px;
  transform: rotate(21deg) skewX(-7deg);
  clip-path: polygon(0 25%, 78% 0, 100% 60%, 22% 100%);
}

/* blue panels */
.panel-blue {
  background: linear-gradient(135deg, #2563eb, #38bdf8 54%, #1e3a8a);
}

.panel-blue-1 {
  left: -20px;
  bottom: 43px;
  height: 39px;
  width: 94px;
  transform: rotate(23deg) skewX(6deg);
  clip-path: polygon(0 0, 82% 14%, 100% 78%, 14% 100%);
}

.panel-blue-2 {
  right: 30px;
  top: -16px;
  height: 50px;
  width: 82px;
  transform: rotate(-16deg) skewX(-6deg);
  clip-path: polygon(10% 0, 100% 22%, 72% 100%, 0 78%);
}

/* gold/yellow accents */
.panel-gold {
  background: linear-gradient(135deg, #f59e0b, #fde047 54%, #b45309);
  opacity: 0.72;
}

.panel-gold-1 {
  left: 51px;
  top: 54px;
  height: 38px;
  width: 52px;
  transform: rotate(17deg);
  clip-path: polygon(50% 0, 100% 34%, 82% 100%, 14% 88%, 0 28%);
}

.panel-gold-2 {
  right: 24px;
  bottom: 58px;
  height: 30px;
  width: 48px;
  transform: rotate(-18deg);
  clip-path: polygon(18% 0, 100% 20%, 76% 100%, 0 70%);
}

/* actual ball seams */
.seam {
  position: absolute;
  z-index: 10;
  border: 1.7px solid rgba(15, 23, 42, 0.24);
  border-radius: 999px;
  opacity: 0.74;
  pointer-events: none;
}

.seam-1 {
  left: 17px;
  top: 29px;
  height: 86px;
  width: 122px;
  transform: rotate(-22deg);
  border-left-color: transparent;
  border-bottom-color: transparent;
}

.seam-2 {
  left: 22px;
  top: 39px;
  height: 96px;
  width: 101px;
  transform: rotate(34deg);
  border-right-color: transparent;
  border-top-color: transparent;
}

.seam-3 {
  left: 43px;
  top: 16px;
  height: 116px;
  width: 64px;
  transform: rotate(-8deg);
  border-left-color: transparent;
  border-right-color: transparent;
}

/* central irregular patch */
.center-mark {
  position: absolute;
  left: 59px;
  top: 60px;
  z-index: 11;
  height: 30px;
  width: 34px;
  border-radius: 42% 58% 54% 46%;
  background:
    radial-gradient(circle at 35% 28%, rgba(255,255,255,0.85), transparent 36%),
    linear-gradient(135deg, rgba(15, 23, 42, 0.12), rgba(255,255,255,0.32));
  border: 1px solid rgba(15, 23, 42, 0.12);
  transform: rotate(18deg);
  box-shadow:
    inset -4px -5px 8px rgba(15,23,42,0.12),
    inset 4px 4px 8px rgba(255,255,255,0.35);
}

@keyframes ballSpinFloat {
  0%,
  100% {
    transform: translateY(0px) rotate(-7deg) scale(1);
  }
  25% {
    transform: translateY(-5px) rotate(1deg) scale(1.015);
  }
  50% {
    transform: translateY(-10px) rotate(8deg) scale(1.035);
  }
  75% {
    transform: translateY(-4px) rotate(2deg) scale(1.018);
  }
}
          
      `}</style>
    </>
  );
}