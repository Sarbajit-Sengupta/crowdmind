export function explainRisk(
  attendance: number,
  weather: string,
  rivalry: string,
  transit: string
) {
  const reasons: string[] = [];

  if (attendance > 70000)
    reasons.push("Attendance exceeds 70,000 spectators");

  if (weather.toLowerCase().includes("rain"))
    reasons.push("Rain increases crowd congestion risk");

  if (rivalry === "high")
    reasons.push("High-rivalry fixture increases crowd pressure");

  if (transit === "high")
    reasons.push("Transit network expected to operate near capacity");

  return reasons;
}