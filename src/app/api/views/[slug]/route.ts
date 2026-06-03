import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  // 1. Get the visitor's IP address
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";

  // 2. Define Redis keys
  const ipKey = `ip:${slug}:${ip}`;
  const viewKey = `pageviews:${slug}`;

  // 3. Track if IP has already visited in the last 24 hours
  // SET <key> <value> NX (only if not exists) EX (expire in seconds)
  const isNewVisitor = await redis.set(ipKey, "1", "EX", 86400, "NX");

  if (isNewVisitor) {
    await redis.incr(viewKey);
  }

  // 4. Fetch the updated view count
  const views = await redis.get(viewKey);

  return NextResponse.json({ views: parseInt(views || "0", 10) });
}
