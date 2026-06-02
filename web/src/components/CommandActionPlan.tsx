type Props = {
  riskLevel: string;
  riskScore: number;
};

export default function CommandActionPlan({ riskLevel, riskScore }: Props) {
  const security = riskScore >= 8 ? 18 : riskScore >= 6 ? 12 : 6;
  const medical = riskScore >= 8 ? 3 : riskScore >= 6 ? 2 : 1;
  const transit = riskScore >= 8 ? 8 : riskScore >= 6 ? 5 : 2;
  const reduction = riskScore >= 8 ? 28 : riskScore >= 6 ? 18 : 10;

  return (
    <section className="mt-8 rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">AI Command Action Plan</h2>
          <p className="text-slate-400 text-sm mt-1">
            Operational response generated from current risk posture.
          </p>
        </div>

        <span className="rounded-full border border-red-500 bg-red-500/10 px-3 py-1 text-xs text-red-300">
          {riskLevel.toUpperCase()} PRIORITY
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-slate-800 p-5">
          <h3 className="font-bold text-cyan-300">Immediate Actions</h3>
          <ul className="mt-3 space-y-2 text-slate-300">
            <li>• Open overflow gates within 10 minutes</li>
            <li>• Redirect arrivals away from highest-density zone</li>
            <li>• Activate crowd control barriers near hotspots</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-slate-800 p-5">
          <h3 className="font-bold text-yellow-300">Resources Needed</h3>
          <ul className="mt-3 space-y-2 text-slate-300">
            <li>• Security officers: +{security}</li>
            <li>• Medical teams: +{medical}</li>
            <li>• Transit marshals: +{transit}</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-slate-800 p-5">
          <h3 className="font-bold text-green-300">Expected Outcome</h3>
          <ul className="mt-3 space-y-2 text-slate-300">
            <li>• Congestion reduced by {reduction}%</li>
            <li>• Response time under 8 minutes</li>
            <li>• Fan flow stabilized before kickoff</li>
          </ul>
        </div>
      </div>
    </section>
  );
}