export function getCopilotResponse(question: string) {
  const q = question.toLowerCase();

  if (q.includes("security")) {
    return [
      "Open Gate C 90 minutes before kickoff",
      "Deploy 15 additional security staff near Gate A",
      "Create a separate exit lane near East Train Station",
      "Place medical response team near Food Court 2",
    ];
  }

  if (q.includes("transit") || q.includes("train")) {
    return [
      "Increase train frequency by 20%",
      "Send crowd alerts to fans using East Train Station",
      "Coordinate with transit police for post-match surge",
    ];
  }

  return [
    "Monitor Gate A and East Train Station closely",
    "Keep Gate C ready as an overflow route",
    "Review crowd movement every 15 minutes",
  ];
}