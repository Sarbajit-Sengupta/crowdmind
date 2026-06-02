type Props = {
  hotspots: string[];
  riskScore: number;
  attendance: number;
  rivalryLevel: "low" | "medium" | "high";
  transitLoad: "low" | "medium" | "high";
};
function getZoneData(
  hotspots: string[],
  riskScore: number,
  attendance: number,
  rivalryLevel: "low" | "medium" | "high",
  transitLoad: "low" | "medium" | "high"
) {
  const rivalryBoost =
    rivalryLevel === "high" ? 8 : rivalryLevel === "medium" ? 4 : 0;

  const transitBoost =
    transitLoad === "high" ? 7 : transitLoad === "medium" ? 3 : 0;

  const attendanceBoost = Math.round((attendance - 60000) / 5000);

  return hotspots.map((hotspot, index) => {
    const hotspotSeed =
      hotspot.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % 9;

    const densityNumber = Math.min(
      95,
      Math.max(
        25,
        riskScore * 6 +
          rivalryBoost +
          transitBoost +
          attendanceBoost +
          hotspotSeed -
          index * 10
      )
    );

    let status = "Stable";
    let color = "green";

    if (densityNumber >= 80) {
      status = "Critical";
      color = "red";
    } else if (densityNumber >= 65) {
      status = "Surging";
      color = "yellow";
    } else if (densityNumber >= 50) {
      status = "Monitoring";
      color = "cyan";
    }

    return {
      zone: hotspot,
      density: `${densityNumber}%`,
      status,
      color,
    };
  });
}

function getColor(color: string) {
  if (color === "red") return "border-red-500 bg-red-950/40 text-red-300";
  if (color === "yellow")
    return "border-yellow-500 bg-yellow-950/30 text-yellow-300";
  if (color === "green")
    return "border-green-500 bg-green-950/30 text-green-300";
  return "border-cyan-500 bg-cyan-950/30 text-cyan-300";
}

export default function OperationsStatusBoard({
  hotspots,
  riskScore,
  attendance,
  rivalryLevel,
  transitLoad,
}: Props) {
  const zones = getZoneData(
    hotspots,
    riskScore,
    attendance,
    rivalryLevel,
    transitLoad
  );

  return (
    <section className="mt-8 rounded-3xl bg-slate-950 border border-slate-800 p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Operations Status Board</h2>
          <p className="text-slate-400 text-sm mt-1">
            Real-time zone pressure and response posture
          </p>
        </div>

        <span className="rounded-full border border-green-500 bg-green-500/10 px-3 py-1 text-xs text-green-300">
          ● SYSTEM ONLINE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {zones.map((zone) => (
          <div
            key={zone.zone}
            className={`rounded-2xl border p-5 ${getColor(zone.color)}`}
          >
            <p className="text-sm opacity-80">Zone</p>
            <h3 className="text-xl font-bold mt-1">{zone.zone}</h3>

            <div className="mt-4">
              <p className="text-sm opacity-80">Crowd Density</p>
              <p className="text-3xl font-black">{zone.density}</p>
            </div>

            <div className="mt-4 h-2 rounded-full bg-black/30">
              <div
                className="h-2 rounded-full bg-current"
                style={{ width: zone.density }}
              />
            </div>

            <p className="mt-4 text-sm uppercase tracking-widest">
              {zone.status}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}