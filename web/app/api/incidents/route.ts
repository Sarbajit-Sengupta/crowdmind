import { NextResponse } from "next/server";
import { clientPromise } from "@/src/lib/mongodb";

export async function POST(req: Request) {
  try {
    const incident = await req.json();

    const client = await clientPromise;
    const db = client.db("crowdmind");

    await db.collection("incidents").insertOne({
      ...incident,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}