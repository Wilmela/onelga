import "server-only";
import { getCurrentSession } from "../actions/auth";
import { handleErrors } from "../utils";
import { getProjects } from "../actions/projects.actions";
import { getBirthcerts } from "../../features/registrations/birth-certs/actions/birth-cert.actions";
import { getLgaIdCards } from "@/features/registrations/lga-ids/actions/lgaId.actions";

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
export async function getBirthcertsDAL() {
  try {
    return await getBirthcerts();
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
export async function getLgaCardsDAL() {
  try {
    return await getLgaIdCards();
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
