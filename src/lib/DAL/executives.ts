import "server-only";
import { getCurrentSession } from "../actions/auth";
import { handleErrors } from "../utils";
import { getExecutives } from "../actions/executive.actions";

export async function getSession() {
  const session = await getCurrentSession();
  if (!session) return;

  return session;
}

export async function getExecutivesDAL() {
  try {
    return await getExecutives();
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
