type Incident = {
  level: string;
  location: string;
  message: string;
  action: string;
};

type Props = {
  incidents: Incident[];
};

export default function LiveIncidentFeed({ incidents }: Props) {
  return (
    <section className="mt-8 rounded-2xl bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-4">Live Incident Feed</h2>

      <div className="space-y-4">
        {incidents.map((incident, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-700 bg-slate-800 p-4"
          >
            <div className="flex justify-between items-center">
              <p className="font-bold">🚨 {incident.location}</p>

              <span className="text-sm text-red-300 uppercase">
                {incident.level}
              </span>
            </div>

            <p className="mt-2 text-slate-300">{incident.message}</p>

            <p className="mt-2 text-cyan-300">
              Recommended Action: {incident.action}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}