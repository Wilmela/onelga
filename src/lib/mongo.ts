import { MongoClient } from "mongodb";
import { MONGO_URL } from "@/env";

if (!MONGO_URL) {
  throw new Error("Missing MONGO_URL");
}

const client = new MongoClient(MONGO_URL);
client.connect().then((r) => r);

const clientPromise = client.db("onelga");

export { clientPromise };

export async function mongoClientConnection() {
  if (!MONGO_URL) {
    throw new Error("Missing The MONGO_URI");
  }

  const client = new MongoClient(MONGO_URL);
  await client.connect();
  const db = client.db("onelga");

  return { db, client };
}
