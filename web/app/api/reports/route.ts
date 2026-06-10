import { NextResponse } from "next/server";
import elasticClient from "@/src/lib/elastic";

const INDEX_NAME = process.env.ELASTICSEARCH_INDEX || "crowdmind-reports";

export async function GET() {
  try {
    const indexExists = await elasticClient.indices.exists({
      index: INDEX_NAME,
    });

    if (!indexExists) {
      return NextResponse.json({
        success: true,
        reports: [],
        message: "Elastic index not created yet",
      });
    }

    const result = await elasticClient.search({
      index: INDEX_NAME,
      size: 5,
      sort: [
        {
          createdAt: {
            order: "desc",
          },
        },
      ],
      query: {
        match_all: {},
      },
    });

    const reports = result.hits.hits.map((hit: any) => ({
      id: hit._id,
      ...hit._source,
    }));

    return NextResponse.json({
      success: true,
      reports,
    });
  } catch (error: any) {
    console.error("ELASTIC REPORTS GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to load Elastic reports",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const report = await req.json();

    const document = {
      ...report,
      storageProvider: "Elastic",
      memoryLayer: "CrowdMind Operational Memory",
      createdAt: new Date().toISOString(),
    };

    const result = await elasticClient.index({
      index: INDEX_NAME,
      document,
      refresh: true,
    });

    return NextResponse.json({
      success: true,
      message: "Report saved to Elastic operational memory",
      storageProvider: "Elastic",
      id: result._id,
    });
  } catch (error: any) {
    console.error("ELASTIC REPORTS POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to save report to Elastic",
      },
      { status: 500 }
    );
  }
}