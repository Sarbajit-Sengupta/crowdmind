const layers = [
  {
    title: "Operational Data",
    detail:
      "Stores match, venue, attendance, weather, hotspot, and incident records.",
  },
  {
    title: "Historical Memory",
    detail:
      "Keeps previous event outcomes so CrowdMind can learn from past incidents.",
  },
  {
    title: "Agent Context",
    detail:
      "Provides the AI Copilot with structured event context before generating actions.",
  },
  {
    title: "Future Vector Search",
    detail:
      "Can retrieve stadium SOPs, safety manuals, and emergency procedures semantically.",
  },
];

export default function MongoArchitecture() {
  return (
    <section className="mt-8 rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <h2 className="text-2xl font-bold mb-4">MongoDB Intelligence Layer</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {layers.map((layer) => (
          <div key={layer.title} className="rounded-xl bg-slate-800 p-4">
            <h3 className="font-bold text-cyan-300">{layer.title}</h3>
            <p className="mt-2 text-slate-300 text-sm">{layer.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}