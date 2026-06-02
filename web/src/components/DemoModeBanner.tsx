export default function DemoModeBanner() {
  return (
    <div className="mt-6 rounded-2xl border border-cyan-800 bg-cyan-950/40 p-4 text-cyan-100">
      <p className="font-semibold">CrowdMind Demo Mode</p>
      <p className="mt-1 text-sm text-cyan-200">
        AI-generated incidents and situation reports are persisted to MongoDB.
        Live dashboard data is optimized for a stable hackathon demonstration.
      </p>
    </div>
  );
}