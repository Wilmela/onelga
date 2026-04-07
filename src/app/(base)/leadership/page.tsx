import { LeaderCard } from "@/components/leader-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import PageBanner from "@/components/page-banner";
import SectionHeader from "@/components/section-header";
import { cloudinaryImageUrl } from "@/env";
import { getCachedExecutives } from "@/lib/DAL/cache";
import { lc, positions } from "@/lib/utils";
import { ExecutiveType } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Leadership",
};

const LeadershipPage = () => {
  return (
    <section>
      <PageBanner />

      <MaxWidthWrapper className="p-y space-y-6">
        <SectionHeader
          title="Members of the Executive Council"
          description="Extraordinary leaders, propelling ONELGA to a higher ground."
        />

        {/* Chairman */}
        <Suspense fallback={<p>Laoding executives...</p>}>
          <RenderExecutives />
        </Suspense>
      </MaxWidthWrapper>
    </section>
  );
};

export default LeadershipPage;

async function RenderExecutives() {
  const executiveMembers = await getCachedExecutives();
  if (!executiveMembers) return notFound();

  const chairman = executiveMembers.find(
    (u: { position: string; isPast: boolean }) =>
      lc(u.position) === positions.chairman && !u.isPast,
  );

  const allowedRoles = [
    "vice chairman",
    "secretary general",
    "public relations officer (p.r.o)",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <div className="h-full md:col-span-1">
        {chairman ? (
          <>
            <div className="relative w-full h-75 md:h-125">
              <Image
                src={`${cloudinaryImageUrl}${chairman.image || "/images/gloo.jpeg"} `}
                alt={"chairman"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-2 mt-4">
              <h3 className="text-xl md:text-2xl font-bold">{chairman.name}</h3>
              <h3 className="text-lg md:text-xl font-semibold">
                {chairman.role}
              </h3>
              <p className="w-full  p-text">{chairman.bio}</p>
              <p>{chairman.tenure}</p>
            </div>
          </>
        ) : (
          <p>Update the chairman&apos;s profile</p>
        )}
      </div>

      {/* top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
        {executiveMembers
          .filter(
            (m: { position: string; past: boolean }) =>
              lc(m.position) !== positions.chairman &&
              !m.past &&
              allowedRoles.includes(lc(m.position)),
          )
          .map((m: ExecutiveType) => (
            <LeaderCard
              key={m.name}
              name={m.name}
              position={m.position}
              bio={m.bio}
              image={m.image}
              tenure={m.tenure}
              showExtra
              type="executive"
            />
          ))}
      </div>

      {/* OTHERS */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
        {executiveMembers
          .filter(
            (m: { position: string; past: boolean }) =>
              lc(m.position) !== positions.chairman &&
              !m.past &&
              !allowedRoles.includes(lc(m.position)),
          )
          .map((m: ExecutiveType) => (
            <LeaderCard
              key={m.name}
              name={m.name}
              position={m.position}
              bio={m.bio}
              image={m.image}
              tenure={m.tenure}
              showExtra
              type="executive"
            />
          ))}
      </div>
    </div>
  );
}
