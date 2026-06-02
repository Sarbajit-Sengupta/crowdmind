import { NextResponse } from "next/server";
import { clientPromise } from "@/src/lib/mongodb";


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("crowdmind");

    const reports = await db
      .collection("reports")
      .find({}, { projection: { _id: 0 } })
      .limit(5)
      .toArray();

    return NextResponse.json({
      success: true,
      reports,
    });
  } catch (error: any) {
    console.error("REPORTS GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const report = await req.json();

    const client = await clientPromise;
    const db = client.db("crowdmind");

    await db.collection("reports").insertOne({
      ...report,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      { status: 500 }
    );
  }
}