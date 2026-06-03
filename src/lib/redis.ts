import { redisCfg } from "@/env";
import { Redis } from "ioredis";

type DataType = {
  port: string;
  host: string;
  username: string;
  password: string;
  db: number;
};

function newRedisClient(data: DataType) {
  // Converted port string to number for ioredis compatibility
  const portNumber = data.port ? parseInt(data.port, 10) : 6379;

  const rdbs = new Redis({
    host: data.host,
    port: portNumber,
    username: data.username,
    password: data.password,
    db: data.db,
  });

  return rdbs;
}

// Global caching for Next.js hot-reloading
const globalForRedis = global as unknown as { redis: Redis };

export const redis =
  globalForRedis.redis ||
  newRedisClient({
    host: redisCfg.host || "127.0.0.1",
    port: redisCfg.port || "6379",
    username: redisCfg.username || "default",
    password: redisCfg.password || "",
    db: redisCfg.db,
  });

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;
