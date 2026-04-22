import MaxWidthWrapper from "./max-width-wrapper";
import SectionHeader from "./section-header";
import { Suspense } from "react";

import AnnouncementCard from "./announcement-card";
import { getCachedAnnouncements } from "@/lib/DAL/cache";
import { AnnouncementType } from "@/types";

const Announcements = async () => {
  const announcements: AnnouncementType[] = await getCachedAnnouncements();

  const pusblishedAnnouncements = announcements.filter((a) => a.isPublished);

  if (!pusblishedAnnouncements.length) {
    return null;
  }

  return (
    <>
      <section>
        <MaxWidthWrapper className="p-y">
          <div className="flex justify-between items-center">
            <SectionHeader
              title="Anncouncements"
              description="Recent public announcements"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Suspense fallback={<p>Loading...</p>}>
              <>
                {pusblishedAnnouncements.map(
                  (announcement: AnnouncementType) => {
                    return (
                      <AnnouncementCard
                        key={announcement.title}
                        {...announcement}
                      />
                    );
                  },
                )}
              </>
            </Suspense>
          </div>
          
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default Announcements;
