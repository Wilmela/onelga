import "server-only";
import { getCurrentSession } from "../actions/auth";
import { handleErrors } from "../utils";
import { getNews } from "../../features/news/actions/news.actions";
import { getAnnouncement } from "../actions/announcement.actions";

export async function getSession() {
  const session = await getCurrentSession();
  if (!session) return;

  return session;
}

export async function getNewsDAL() {
  try {
    return await getNews();
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
export async function getAnnouncementsDAL() {
  try {
    return await getAnnouncement();
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
