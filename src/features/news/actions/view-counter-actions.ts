"use server";

import NewsView from "@/lib/database/models/news-view.model";
import { redis } from "@/lib/redis";
import { handleErrors } from "@/lib/utils";

export async function syncViewsToMainDb() {
  console.log("calling...");

  try {
    const keys = await redis.keys("pageviews:*");

    console.log("keys", keys);

    for (const key of keys) {
      const slug = key.split(":")[1];
      const viewsInRedis = await redis.get(key);

      if (viewsInRedis) {
        const viewCount = parseInt(viewsInRedis, 10);

        await NewsView.findOneAndUpdate(
          { slug: slug },
          { $set: { views: viewCount } },
          {
            upsert: true,
            new: true,
          },
        );
      }
    }
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
