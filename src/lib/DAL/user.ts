import "server-only";
import { getCurrentSession } from "../actions/auth";
import { handleErrors } from "../utils";
import { getUsers } from "../actions/user.actions";

export async function getSession() {
  const session = await getCurrentSession();
  if (!session) return;

  return session;
}

export async function getAllUsers() {
  try {
    return await getUsers();
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
