import { calculateRisk } from "@/src/lib/riskEngine";

export const matches: Record<string, MatchData> = {
  argentinaBrazil: {
    match: "Argentina vs Brazil",
    stadium: "MetLife Stadium",
    attendance: 82000,
    weather: "Light Rain",
    rivalryLevel: "high",
    transitLoad: "high",
    riskScore: calculateRisk({
      attendance: 82000,
      weather: "Light Rain",
      rivalryLevel: "high",
      transitLoad: "high",
      pastIncidents: 3,
    }),
    hotspots: ["Gate A", "East Train Station", "Food Court 2"],
    recommendations: [
      "Open Gate C early",
      "Add 15 security staff",
      "Increase train frequency by 20%",
      "Redirect fans through South Entrance",
    ],
  },

  usaMexico: {
    match: "USA vs Mexico",
    stadium: "SoFi Stadium",
    attendance: 70000,
    weather: "Clear",
    rivalryLevel: "high",
    transitLoad: "medium",
    riskScore: calculateRisk({
      attendance: 70000,
      weather: "Clear",
      rivalryLevel: "high",
      transitLoad: "medium",    
      pastIncidents: 2,
    }),
    hotspots: ["North Gate", "Parking Zone B", "Metro Shuttle Stop"],
    recommendations: [
      "Separate supporter entry lanes",
      "Add shuttle buses after full-time",
      "Increase police presence near North Gate",
    ],
  },

  englandFrance: {
    match: "England vs France",
    stadium: "AT&T Stadium",
    attendance: 76000,
    weather: "Cloudy",
    rivalryLevel: "medium",
    transitLoad: "medium",
    riskScore: calculateRisk({
      attendance: 76000,
      weather: "Cloudy",
      rivalryLevel: "medium",
      transitLoad: "medium",
      pastIncidents: 1,
    }),
    hotspots: ["West Entrance", "Merchandise Plaza", "Ride Share Zone"],
    recommendations: [
      "Open West Entrance 45 minutes earlier",
      "Add crowd barriers near Merchandise Plaza",
      "Create dedicated ride-share pickup lanes",
    ],
  },
};

export type MatchKey = keyof typeof matches;

export type MatchData = {
  match: string;
  stadium: string;
  attendance: number;
  weather: string;
  rivalryLevel: "low" | "medium" | "high";
  transitLoad: "low" | "medium" | "high";
  riskScore: number;
  hotspots: string[];
  recommendations: string[];
};