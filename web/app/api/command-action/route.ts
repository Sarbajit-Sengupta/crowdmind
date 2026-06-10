import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    return NextResponse.json({
      success: true,
      source: "CrowdMind Command Action API",
      actionPlan: [
        "Increase steward presence near high-density entrances.",
        "Coordinate transit flow with venue exit timing.",
        "Stage medical response near identified crowd hotspots.",
      ],
      receivedContext: body,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate command action",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "CrowdMind command action route is active",
  });
}