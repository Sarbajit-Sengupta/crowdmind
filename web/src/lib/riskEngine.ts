export type EventRiskInput = {
  attendance: number;
  weather: string;
  rivalryLevel: "low" | "medium" | "high";
  transitLoad: "low" | "medium" | "high";
  pastIncidents: number;
};

export function calculateRisk(input: EventRiskInput) {
  let score = 3;

  if (input.attendance > 70000) score += 2;
  if (input.attendance > 80000) score += 1;
  if (input.weather.toLowerCase().includes("rain")) score += 1;
  if (input.rivalryLevel === "medium") score += 1;
  if (input.rivalryLevel === "high") score += 2;
  if (input.transitLoad === "medium") score += 1;
  if (input.transitLoad === "high") score += 2;
  if (input.pastIncidents >= 2) score += 1;

  return Math.min(score, 10);
}

export function getRiskLevel(score: number) {
  if (score >= 8) return "Critical";
  if (score >= 6) return "High";
  if (score >= 4) return "Medium";
  return "Low";
}