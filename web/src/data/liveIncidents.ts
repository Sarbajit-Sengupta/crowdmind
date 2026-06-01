export const liveIncidents = {
  argentinaBrazil: [
    {
      level: "critical",
      location: "Gate A",
      message: "Crowd density exceeded 85%",
      action: "Redirect fans to Gate C",
    },
    {
      level: "warning",
      location: "East Train Station",
      message: "Inbound passenger surge detected",
      action: "Increase train frequency by 20%",
    },
    {
      level: "medium",
      location: "Food Court 2",
      message: "Queue length increasing",
      action: "Deploy additional stewards",
    },
  ],

  usaMexico: [
    {
      level: "warning",
      location: "North Gate",
      message: "Supporter groups arriving simultaneously",
      action: "Separate entry lanes",
    },
  ],

  englandFrance: [
    {
      level: "medium",
      location: "Ride Share Zone",
      message: "Exit queue forming",
      action: "Open dedicated pickup corridor",
    },
  ],
};