import { CustomBreadCrumb } from "@/components/customs";
import { LeaderCard } from "@/components/leader-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import PageBanner from "@/components/page-banner";
import SectionHeader from "@/components/section-header";
import { positions } from "@/lib/constants";
import { getCachedExecutives } from "@/lib/DAL/cache";
import { lc } from "@/lib/utils";
import { ExecutiveType } from "@/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const PastLeadersPage = () => {
  return (
    <section>
      <PageBanner />
      <MaxWidthWrapper className="p-y">
        <div className="flex items-center justify-between">
          <SectionHeader
            title="Past Members of the Executive Council"
            description="Past council chairmen."
          />

          <div className="hidden md:block w-1/4">
            <CustomBreadCrumb
              currentPage="Past Leaders"
              items={[
                { href: "/", title: "Home" },
                { href: "/leadership", title: "Leadership" },
              ]}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Suspense fallback={<p>Laoding past exe...</p>}>
            <RenderPastExecutives />
          </Suspense>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default PastLeadersPage;

async function RenderPastExecutives() {
  const executiveMembers = await getCachedExecutives();
  if (!executiveMembers) return notFound();

  const past = executiveMembers.filter(
    (e: { isPast: boolean; position: string }) =>
      e.isPast && lc(e.position) === positions.chairman,
  );

   if (!past.length) {
     return <p>Past leaders not found</p>;
   }

  return (
    <>
      {past.map((m: ExecutiveType) => (
        <LeaderCard
          key={m.name}
          name={m.name}
          position={m.position}
          bio={m.bio}
          image={m.image}
          tenure={m.tenure}
          showExtra
          isEditable={false}
          type="executive"
        />
      ))}
    </>
  );
}
