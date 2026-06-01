type TimelineEvent = {
  time: string;
  event: string;
};

type Props = {
  events: TimelineEvent[];
};

export default function CommandTimeline({ events }: Props) {
  return (
    <section className="mt-8 rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Operations Timeline</h2>

        <span className="text-xs rounded-full bg-cyan-950 text-cyan-300 px-3 py-1 border border-cyan-700">
          Live Feed
        </span>
      </div>

      <div className="space-y-5">
        {events.map((item, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-cyan-400" />
              {index !== events.length - 1 && (
                <div className="w-px h-12 bg-slate-700 mt-2" />
              )}
            </div>

            <div>
              <p className="text-cyan-300 text-sm font-semibold">
                {item.time}
              </p>

              <p className="text-white mt-1">
                {item.event}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}