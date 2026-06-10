from google.adk import Agent

def analyze_stadium_risk(match: str, stadium: str, attendance: int, risk_score: int, hotspots: str) -> dict:
    """Analyze a World Cup stadium risk situation and return operational recommendations."""
    return {
        "match": match,
        "stadium": stadium,
        "risk_score": risk_score,
        "hotspots": hotspots,
        "recommendation": "Deploy security to hotspots, increase transit flow, and stage medical teams near dense zones."
    }

root_agent = Agent(
    name="crowdmind_worldcup_operations_agent",
    model="gemini-2.0-flash",
    description="World Cup stadium operations agent for crowd intelligence and safety response.",
    instruction="""
You are CrowdMind, a World Cup 2026 stadium operations agent.
You analyze matchday crowd risk, coordinate safety recommendations,
and generate command actions using Gemini reasoning.
""",
    tools=[analyze_stadium_risk],
)