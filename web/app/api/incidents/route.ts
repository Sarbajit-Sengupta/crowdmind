import { NextResponse } from "next/server";

const incidents = [
  {
    id: "INC-001",
    type: "Gate Congestion",
    severity: "High",
    location: "Gate A",
    description: "Heavy crowd buildup detected near primary entrance.",
    status: "Monitoring",
    createdAt: new Date().toISOString(),
  },
  {
    id: "INC-002",
    type: "Transit Pressure",
    severity: "Medium",
    location: "East Train Station",
    description: "Increased passenger flow expected before kickoff.",
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "INC-003",
    type: "Medical Standby",
    severity: "Medium",
    location: "Lower Concourse",
    description: "Medical teams staged near high-density concourse zone.",
    status: "Prepared",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    incidents,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    return NextResponse.json({
      success: true,
      message: "Incident received",
      incident: {
        id: `INC-${Date.now()}`,
        ...body,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process incident",
      },
      { status: 500 }
    );
  }
}