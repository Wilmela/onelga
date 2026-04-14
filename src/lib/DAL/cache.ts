import { cacheTag } from "next/cache";
import { getAllUsers } from "./user";
import { getProjectsDAL } from "./project";
import { getExecutivesDAL } from "./executives";
import { getCouncilorsDAL } from "./councilors";
import { getAnnouncementsDAL, getNewsDAL } from "./news";

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
