import { Suspense } from "react";

import { getCachedAnnouncements } from "@/lib/DAL/cache";
import { AnnouncementType } from "@/types";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import SectionHeader from "@/components/section-header";
import { Calendar, Megaphone } from "lucide-react";
import { fullDate } from "@/components/copy-date";
import { cleanText } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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

type Props = AnnouncementType;

const AnnouncementCard = ({ title, date, content, type }: Props) => {
  return (
    <div className="group relative flex flex-col min-h-100 bg-white border border-slate-200 hover:border-app-blue/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Header Bar */}
      <div className="h-1 bg-app-blue w-full" />

      <div className="p-5 flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-app-blue/10 rounded-lg text-app-blue">
            <Megaphone size={50} />
          </div>
          <Badge className="bg-app-blue text-white text-sm">
            {type || "Public"}
          </Badge>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium bg-slate-100 px-2.5 py-1 rounded-full">
            <Calendar size={14} />
            {fullDate(date)}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold font-montserrat text-slate-800 leading-tight line-clamp-2">
            {title}
          </h3>
          <div className="p-text max-w-[30ch] text-xl wrap-break-word italic">
            {cleanText(content)}
          </div>
        </div>
      </div>
    </div>
  );
};
