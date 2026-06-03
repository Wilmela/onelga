import { getApplications } from "@/features/applications/actions/application.actions";
import "server-only";
import { handleErrors } from "../utils";
import { getJobPostings } from "@/features/applications/actions/job-posting-actions";

export async function getJobApplicationsDAL() {
  try {
    return await getApplications();
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
export async function getJobPostingsDAL() {
  try {
    return await getJobPostings();
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
