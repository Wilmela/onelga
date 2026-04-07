"use server";

import { getCachedNews } from "./DAL/cache";
import { handleErrors } from "./utils";

export async function fetchCachedNews() {
  try {
    const news = await getCachedNews();

    let recentNews;
    if (news) {
      recentNews = news
        .filter((n: { isPublished: boolean }) => n.isPublished)
        .slice(0, 2);
    }

    return JSON.parse(JSON.stringify(recentNews));
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
