import "server-only";
import { getCurrentSession } from "../actions/auth";
import { handleErrors } from "../utils";
import { getProjects } from "../actions/projects.actions";

export async function getSession() {
  const session = await getCurrentSession();
  if (!session) return;

  return session;
}

export async function getProjectsDAL() {
  try {
    return await getProjects();
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
