type RiskMapProps = {
  hotspots: string[];
};

export default function RiskMap({ hotspots }: RiskMapProps) {
  return (
    <section className="mt-8 rounded-2xl bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-4">Stadium Risk Map</h2>

      <div className="relative h-80 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden">
        <div className="absolute inset-10 rounded-full border-4 border-slate-600" />

        <div className="absolute left-1/2 top-1/2 h-24 w-40 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-slate-700 flex items-center justify-center">
          Pitch
        </div>

        {hotspots.map((spot, index) => (
          <div
            key={spot}
            className="absolute rounded-full bg-red-500 px-4 py-2 text-sm font-bold shadow-lg"
            style={{
              left: `${20 + index * 25}%`,
              top: `${25 + index * 18}%`,
            }}
          >
            ⚠️ {spot}
          </div>
        ))}
      </div>
    </section>
  );
}