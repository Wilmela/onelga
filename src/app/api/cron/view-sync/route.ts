import { cronSecret } from "@/env";
import { syncViewsToMainDb } from "@/features/news/actions/view-counter-actions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${cronSecret}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await syncViewsToMainDb();
    return NextResponse.json({
      success: true,
      message: "Views synchronized successfully",
    });
  } catch (error) {
    console.error("Cron sync error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
