const sources = [
  "Match schedule and venue profile",
  "Expected attendance and ticketing load",
  "Weather and mobility conditions",
  "Transit station capacity",
  "Historical incident memory",
  "MongoDB operational data store",
];

export default function DataSources() {
  return (
    <section className="mt-8 rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <h2 className="text-2xl font-bold mb-4">Operational Data Sources</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sources.map((source) => (
          <div key={source} className="rounded-xl bg-slate-800 p-4">
            ✅ {source}
          </div>
        ))}
      </div>
    </section>
  );
}