"use client";

type Incident = {
  level: string;
  location: string;
  message: string;
  action: string;
};

type Props = {
  incidents: Incident[];
};

type SeverityTone = "critical" | "warning" | "info";

function normalizeLevel(level: string): SeverityTone {
  if (level?.toLowerCase() === "critical") return "critical";
  if (level?.toLowerCase() === "warning") return "warning";
  return "info";
}

function getIncidentMeta(level: string) {
  const severity = normalizeLevel(level);

  if (severity === "critical") {
    return {
      label: "Critical",
      status: "Escalating",
      tone: "critical",
      priority: "P1",
      response: "Immediate",
    };
  }

  if (severity === "warning") {
    return {
      label: "Warning",
      status: "Monitoring",
      tone: "warning",
      priority: "P2",
      response: "Active Watch",
    };
  }

  return {
    label: "Info",
    status: "Observed",
    tone: "info",
    priority: "P3",
    response: "Standard",
  };
}

export default function LiveIncidentFeed({ incidents }: Props) {
  const criticalCount = incidents.filter(
    (incident) => normalizeLevel(incident.level) === "critical"
  ).length;

  const warningCount = incidents.filter(
    (incident) => normalizeLevel(incident.level) === "warning"
  ).length;

  const readiness =
    criticalCount > 0
      ? "Escalated Response"
      : warningCount > 0
      ? "Active Monitoring"
      : "Stable Operations";

  return (
    <>
      <section className="relative mt-10 overflow-hidden rounded-[2.5rem] border border-cyan-300/15 bg-[#030712]/95 p-7 shadow-[0_0_120px_rgba(34,211,238,0.10)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute right-[-120px] top-[-80px] h-[420px] w-[420px] rounded-full bg-rose-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-[35%] h-[360px] w-[360px] rounded-full bg-fuchsia-500/8 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:54px_54px]" />
        </div>

        <div className="relative z-10 mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-cyan-300">
              Matchday Incident Command
            </p>

            <h2 className="mt-2 text-4xl font-black tracking-tight text-white">
              Live Incident Feed
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Real-time World Cup operations alerts with severity, location,
              response posture, and recommended field action.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
              ● Updating Live
            </span>

            <span className="rounded-full border border-rose-300/25 bg-rose-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-rose-300">
              {criticalCount} Critical
            </span>

            <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-amber-300">
              {warningCount} Watch
            </span>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          {/* LEFT SUMMARY */}
          <aside className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_42%)]" />

            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">
                Incident Snapshot
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                Stadium Operations Pulse
              </h3>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    Active Alerts
                  </p>
                  <p className="mt-2 text-4xl font-black text-cyan-300">
                    {incidents.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-rose-300/15 bg-rose-300/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    Priority
                  </p>
                  <p className="mt-2 text-4xl font-black text-rose-300">
                    {criticalCount > 0 ? "P1" : warningCount > 0 ? "P2" : "P3"}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                  Command Readiness
                </p>

                <p className="mt-2 text-2xl font-black text-white">
                  {readiness}
                </p>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full ${
                      criticalCount > 0
                        ? "bg-gradient-to-r from-rose-500 to-orange-300"
                        : warningCount > 0
                        ? "bg-gradient-to-r from-amber-400 to-yellow-200"
                        : "bg-gradient-to-r from-cyan-300 to-emerald-300"
                    }`}
                    style={{
                      width:
                        criticalCount > 0
                          ? "94%"
                          : warningCount > 0
                          ? "76%"
                          : "58%",
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3">
                {[
                  ["Security", criticalCount > 0 ? "Rapid teams active" : "Ready"],
                  [
                    "Transit",
                    warningCount > 0 ? "Flow watch enabled" : "Normal routing",
                  ],
                  [
                    "Medical",
                    criticalCount > 0 ? "Standby corridor active" : "Ready state",
                  ],
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
          </aside>

          {/* RIGHT LANDSCAPE INCIDENT AREA */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,70,239,0.12),transparent_42%)]" />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-fuchsia-300">
                  Live Operations Log
                </p>
                <h3 className="mt-2 text-2xl font-black text-white">
                  Active Stadium Incidents
                </h3>
              </div>

              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-300">
                Auto-refresh
              </span>
            </div>

            <div className="relative z-10 mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {incidents.map((incident, index) => {
                const meta = getIncidentMeta(incident.level);

                return (
                  <div
                    key={index}
                    className={`incident-card incident-${meta.tone} group relative min-h-[230px] overflow-hidden rounded-[1.75rem] border bg-white/[0.035] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.055]`}
                  >
                    <div className="absolute inset-y-0 left-0 w-1 incident-rail" />

                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                    </div>

                    <div className="relative z-10 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="incident-priority rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
                            {meta.priority}
                          </span>

                          <span className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                            {meta.status}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-black text-white">
                          {incident.location}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {incident.message}
                        </p>
                      </div>

                      <span className="incident-level rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.2em]">
                        {meta.label}
                      </span>
                    </div>

                    <div className="relative z-10 mt-5 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                        Recommended Field Action
                      </p>

                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
                        {incident.action}
                      </p>
                    </div>

                    <div className="relative z-10 mt-4 flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                        Response Mode
                      </p>

                      <p className="incident-response text-xs font-black uppercase tracking-[0.2em]">
                        {meta.response}
                      </p>
                    </div>
                  </div>
                );
              })}

              {incidents.length === 0 && (
                <div className="col-span-full rounded-[1.75rem] border border-cyan-300/15 bg-cyan-300/10 p-8 text-center">
                  <p className="text-lg font-black text-cyan-300">
                    No active incidents
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    Stadium operations are currently stable.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .incident-card {
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .incident-critical {
          border-color: rgba(251, 113, 133, 0.24);
        }
        .incident-critical .incident-rail {
          background: linear-gradient(to bottom, #fb7185, #f97316);
          box-shadow: 0 0 22px rgba(251, 113, 133, 0.55);
        }
        .incident-critical .incident-priority,
        .incident-critical .incident-level {
          border-color: rgba(251, 113, 133, 0.28);
          color: rgb(253, 164, 175);
          background: rgba(251, 113, 133, 0.1);
        }
        .incident-critical .incident-response {
          color: rgb(253, 164, 175);
        }

        .incident-warning {
          border-color: rgba(251, 191, 36, 0.24);
        }
        .incident-warning .incident-rail {
          background: linear-gradient(to bottom, #fbbf24, #fde68a);
          box-shadow: 0 0 22px rgba(251, 191, 36, 0.55);
        }
        .incident-warning .incident-priority,
        .incident-warning .incident-level {
          border-color: rgba(251, 191, 36, 0.28);
          color: rgb(252, 211, 77);
          background: rgba(251, 191, 36, 0.1);
        }
        .incident-warning .incident-response {
          color: rgb(252, 211, 77);
        }

        .incident-info {
          border-color: rgba(34, 211, 238, 0.24);
        }
        .incident-info .incident-rail {
          background: linear-gradient(to bottom, #22d3ee, #67e8f9);
          box-shadow: 0 0 22px rgba(34, 211, 238, 0.55);
        }
        .incident-info .incident-priority,
        .incident-info .incident-level {
          border-color: rgba(34, 211, 238, 0.28);
          color: rgb(103, 232, 249);
          background: rgba(34, 211, 238, 0.1);
        }
        .incident-info .incident-response {
          color: rgb(103, 232, 249);
        }
      `}</style>
    </>
  );
}