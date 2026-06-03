import { cacheTag } from "next/cache";
import { getAllUsers } from "./user";
import { getBirthcertsDAL, getLgaCardsDAL, getProjectsDAL } from "./project";
import { getExecutivesDAL } from "./executives";
import { getCouncilorsDAL } from "./councilors";
import { getAnnouncementsDAL, getNewsDAL } from "./news";
import { getJobApplicationsDAL, getJobPostingsDAL } from "./applications";

// Cache
export async function cachedUsers() {
  "use cache";
  cacheTag("users");

  return await getAllUsers();
}

export async function getCachedNews() {
  "use cache";
  cacheTag("news");

  return await getNewsDAL();
}
export async function getCachedAnnouncements() {
  "use cache";
  cacheTag("announcements");

  return await getAnnouncementsDAL();
}

export async function getCachedExecutives() {
  "use cache";
  cacheTag("executives");

  return await getExecutivesDAL();
}

export async function getCachedCouncilors() {
  "use cache";
  cacheTag("councilors");

  return await getCouncilorsDAL();
}

export async function cachedprojects() {
  "use cache";
  cacheTag("projects");

  const data = await getProjectsDAL();

  return data;
}
export async function cachedBirthcerts() {
  "use cache";
  cacheTag("birthcert");

  const data = await getBirthcertsDAL();

  return data;
}
export async function cachedLgaCards() {
  "use cache";
  cacheTag("lgaId");

  const data = await getLgaCardsDAL();

  return data;
}
export async function cachedJobAplications() {
  "use cache";
  cacheTag("applications");

  const data = await getJobApplicationsDAL();

  return data;
}

export async function cachedJobPostings() {
  "use cache";
  cacheTag("job-postings");

  const data = await getJobPostingsDAL();

  return data;
}
