import MaxWidthWrapper from "./max-width-wrapper";
import SectionHeader from "./section-header";
import { Suspense } from "react";

import Announcementcard from "./announcement-card";
import { getCachedAnnouncements } from "@/lib/DAL/cache";

// const annoucementData = [
//   {
//     id: "1",
//     title: "Ban on scarp scavengers",
//     content:
//       "This is to announce to the public that a ban has been placed on scrap scavenger from today 4-April-2026 till further notice",
//     date: "10/04/2026",
//   },
//   {
//     id: "2",
//     title: "Ban on scarp scavengers",
//     content:
//       "This is to announce to the public that a ban has been placed on scrap scavenger from today 4-April-2026 till further notice",
//     date: "10/04/2026",
//   },
// ];
const Announcements = async () => {
  const announcement = await getCachedAnnouncements();

  
  return (
    <>
      {announcement.length && (
        <section>
          <MaxWidthWrapper className="p-y">
            <div className="flex justify-between items-center">
              <SectionHeader
                title="Anncouncements"
                description="Recent public announcements"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 gap-8">
              <Suspense fallback={<p>Loading...</p>}>
                <Announcementcard announcements={announcement} />
              </Suspense>
            </div>
          </MaxWidthWrapper>
        </section>
      )}
    </>
  );
};

export default Announcements;
