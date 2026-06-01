export function generateSituationReport(event: any, riskLevel: string) {
  return {
    summary: `${event.match} at ${event.stadium} is classified as ${riskLevel} risk due to crowd size, mobility pressure, and event context.`,
    impact: [
      `${event.hotspots[0]} may experience early congestion`,
      `${event.hotspots[1]} requires active monitoring`,
      "Post-match crowd movement may overload nearby exits",
    ],
    priorityActions: event.recommendations.slice(0, 3),
  };
}