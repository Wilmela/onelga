import "server-only";
import { getCurrentSession } from "../actions/auth";
import { handleErrors } from "../utils";
import { getCouncilors } from "../actions/councilor.actions";

export async function getSession() {
  const session = await getCurrentSession();
  if (!session) return;

  return session;
}

export async function getCouncilorsDAL() {
  try {
    return await getCouncilors();
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
