import "server-only";
import { getCurrentSession } from "../actions/auth";
import { handleErrors } from "../utils";
import { getNews } from "../actions/news.actions";

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
