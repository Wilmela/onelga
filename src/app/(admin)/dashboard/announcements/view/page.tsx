import Announcementcard from "@/components/announcement-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { NewsSkeleton } from "@/components/skeletons";
import { getCachedAnnouncements } from "@/lib/DAL/cache";
import { Suspense } from "react";

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-y">
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

  return <Announcementcard announcements={announcements} isEditable />;
}
