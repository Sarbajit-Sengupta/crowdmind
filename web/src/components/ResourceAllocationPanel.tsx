type Props = {
  riskScore: number;
};

export default function ResourceAllocationPanel({ riskScore }: Props) {
  const security = riskScore >= 8 ? 95 : riskScore >= 6 ? 72 : 45;
  const medical = riskScore >= 8 ? 12 : riskScore >= 6 ? 8 : 4;
  const transit = riskScore >= 8 ? 28 : riskScore >= 6 ? 18 : 10;

  const resources = [
    ["Security Staff", security, 120, "text-red-300"],
    ["Medical Units", medical, 15, "text-green-300"],
    ["Transit Marshals", transit, 35, "text-cyan-300"],
  ];

  return (
    <section className="mt-8 rounded-3xl bg-slate-900 border border-slate-800 p-6">
      <h2 className="text-2xl font-bold">Resource Allocation</h2>
      <p className="text-slate-400 text-sm mt-1">
        Suggested operational staffing based on current risk.
      </p>

      <div className="mt-6 space-y-5">
        {resources.map(([label, value, max, color]) => (
          <div key={label as string}>
            <div className="flex justify-between mb-2">
              <p className="text-slate-300">{label}</p>
              <p className={`font-bold ${color}`}>
                {value}/{max}
              </p>
            </div>

            <div className="h-3 rounded-full bg-slate-800">
              <div
                className="h-3 rounded-full bg-current"
                style={{ width: `${(Number(value) / Number(max)) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}