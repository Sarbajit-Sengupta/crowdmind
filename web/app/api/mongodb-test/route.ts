import { NextResponse } from "next/server";
import { clientPromise } from "@/src/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "crowdmind");

    await db.collection("test").insertOne({
      message: "MongoDB connected",
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "MongoDB connected successfully",
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