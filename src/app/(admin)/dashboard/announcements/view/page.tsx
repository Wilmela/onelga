import MaxWidthWrapper from "@/components/max-width-wrapper";
import { NewsSkeleton } from "@/components/skeletons";
import { getCachedAnnouncements } from "@/lib/DAL/cache";
import { AnnouncementType } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";
import AnnouncementDashboardCard from "@/features/announcements/components/announcement-dashboard-card";

export const metadata: Metadata = {
  title: "Admin | Announcements",
};
const ViewAnnouncementPage = () => {
  return (
    <section>
      <MaxWidthWrapper className="p-y ">
        <Suspense
          fallback={
            <>
              <NewsSkeleton />
            </>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-y">
            <RenderAnnouncements />
          </div>
        </Suspense>
      </MaxWidthWrapper>
    </section>
  );
};

export default ViewAnnouncementPage;

async function RenderAnnouncements() {
  const announcements = await getCachedAnnouncements();

  if (!announcements.length) {
    return <p>No announcements found.</p>;
  }

  return (
    <>
      {announcements.map((announcement: AnnouncementType) => (
        <AnnouncementDashboardCard key={announcement.title} {...announcement} />
      ))}
    </>
  );
}
