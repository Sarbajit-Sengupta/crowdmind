type Incident = {
  level: string;
  location: string;
  message: string;
  action: string;
};

type Props = {
  incidents: Incident[];
};

function getSeverityStyle(level: string) {
  if (level === "critical") {
    return "border-red-500/60 bg-red-950/40 text-red-300";
  }

  if (level === "warning") {
    return "border-yellow-500/60 bg-yellow-950/30 text-yellow-300";
  }

  return "border-cyan-500/50 bg-cyan-950/30 text-cyan-300";
}

export default function LiveIncidentFeed({ incidents }: Props) {
  return (
    <section className="mt-8 rounded-2xl bg-slate-900 p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Live Incident Feed</h2>

        <span className="text-xs rounded-full bg-green-900 text-green-300 px-3 py-1 border border-green-700">
          ● Updating live
        </span>
      </div>

      <div className="space-y-4">
        {incidents.map((incident, index) => (
          <div
            key={index}
            className={`rounded-xl border p-4 ${getSeverityStyle(
              incident.level
            )}`}
          >
            <div className="flex justify-between items-center">
              <p className="font-bold">🚨 {incident.location}</p>

              <span className="text-xs uppercase tracking-widest">
                {incident.level}
              </span>
            </div>

            <p className="mt-2 text-white">{incident.message}</p>

            <p className="mt-2 text-sm">
              Recommended Action: {incident.action}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}