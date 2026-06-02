type Props = {
  incident: any;
};

export default function AIIncidentTimeline({ incident }: Props) {
  if (!incident) return null;

  const steps = [
    {
      time: "T+00",
      title: "Incident detected",
      detail: incident.message,
    },
    {
      time: "T+03",
      title: "Response unit assigned",
      detail: `Security team dispatched to ${incident.location}.`,
    },
    {
      time: "T+07",
      title: "Operational action started",
      detail: incident.action,
    },
    {
      time: "T+15",
      title: "Expected stabilization",
      detail: "Crowd pressure reduced and fan flow restored.",
    },
  ];

  return (
    <section className="mt-8 rounded-3xl bg-slate-900 border border-slate-800 p-6">
      <h2 className="text-2xl font-bold mb-6">AI Incident Response Timeline</h2>

      <div className="space-y-5">
        {steps.map((step, index) => (
          <div key={step.time} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-cyan-400" />
              {index !== steps.length - 1 && (
                <div className="w-px h-12 bg-slate-700 mt-2" />
              )}
            </div>

            <div>
              <p className="text-cyan-300 text-sm font-bold">{step.time}</p>
              <h3 className="font-bold">{step.title}</h3>
              <p className="text-slate-300 text-sm mt-1">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}