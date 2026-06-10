"use client";

export default function EventIntelligenceStrip() {
  const items = [
    {
      label: "Ingress Load",
      value: "82K",
      sub: "Projected arrivals",
      tone: "cyan",
    },
    {
      label: "Gate Pressure",
      value: "84%",
      sub: "North / East cluster",
      tone: "rose",
    },
    {
      label: "Transit Load",
      value: "77%",
      sub: "East rail station",
      tone: "amber",
    },
    {
      label: "Command Posture",
      value: "Critical",
      sub: "Pre-match deployment",
      tone: "fuchsia",
    },
  ];

  return (
    <section className="relative mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 shadow-[0_0_90px_rgba(34,211,238,0.10)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_85%_50%,rgba(217,70,239,0.12),transparent_30%)]" />

      <div className="relative z-10 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className={`event-tile event-${item.tone} group relative overflow-hidden rounded-[1.5rem] border bg-white/[0.035] p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015]`}
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)]" />

            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-slate-500">
                  {item.label}
                </p>

                <p className="mt-2 text-3xl font-black text-white">
                  {item.value}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {item.sub}
                </p>
              </div>

              <span className="pulse-dot mt-1 h-3 w-3 rounded-full" />
            </div>

            <div className="relative z-10 mt-5 h-1.5 overflow-hidden rounded-full bg-white/5">
              <div className="bar h-full rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .event-tile {
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
        }

        .event-cyan {
          border-color: rgba(34,211,238,0.22);
        }
        .event-cyan .pulse-dot,
        .event-cyan .bar {
          background: linear-gradient(to right, #22d3ee, #7dd3fc);
          box-shadow: 0 0 18px rgba(34,211,238,0.45);
        }

        .event-rose {
          border-color: rgba(251,113,133,0.22);
        }
        .event-rose .pulse-dot,
        .event-rose .bar {
          background: linear-gradient(to right, #fb7185, #fda4af);
          box-shadow: 0 0 18px rgba(251,113,133,0.45);
        }

        .event-amber {
          border-color: rgba(251,191,36,0.22);
        }
        .event-amber .pulse-dot,
        .event-amber .bar {
          background: linear-gradient(to right, #fbbf24, #fde68a);
          box-shadow: 0 0 18px rgba(251,191,36,0.45);
        }

        .event-fuchsia {
          border-color: rgba(217,70,239,0.22);
        }
        .event-fuchsia .pulse-dot,
        .event-fuchsia .bar {
          background: linear-gradient(to right, #d946ef, #f0abfc);
          box-shadow: 0 0 18px rgba(217,70,239,0.45);
        }

        .event-cyan .bar { width: 82%; }
        .event-rose .bar { width: 84%; }
        .event-amber .bar { width: 77%; }
        .event-fuchsia .bar { width: 92%; }

        .pulse-dot {
          animation: dotPulse 2s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.75;
          }
          50% {
            transform: scale(1.4);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}