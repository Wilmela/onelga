import { CustomBreadCrumb } from "@/components/customs";
import { LeaderCard } from "@/components/leader-card";
import { LeaderCardSkeleton } from "@/components/leader-card-skeleton";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import PageBanner from "@/components/page-banner";
import SectionHeader from "@/components/section-header";
import { getCachedCouncilors } from "@/lib/DAL/cache";
import { CouncilorType } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Leadership | Councilors",
};
const CouncilorsPage = () => {
  return (
    <section>
      <PageBanner />
      <MaxWidthWrapper className="p-y">
        <div className="flex items-center justify-between">
          <SectionHeader
            title="Members of the Legislative Council"
            description="Councilors of various wards."
          />

          <div className="hidden md:block w-1/4">
            <CustomBreadCrumb
              currentPage="Councilors"
              items={[
                { href: "/", title: "Home" },
                { href: "/leadership", title: "Leadership" },
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Suspense
            fallback={
              <>
                <LeaderCardSkeleton />
                <LeaderCardSkeleton />
                <LeaderCardSkeleton />
                <LeaderCardSkeleton />
              </>
            }
          >
            <RenderCouncilors />
          </Suspense>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default CouncilorsPage;

async function RenderCouncilors() {
  const executiveMembers = await getCachedCouncilors();

  const councilors = executiveMembers.filter(
    (m: { position: string; isPast: boolean }) => !m.isPast,
  );

  if (!councilors.length) {
    return <p>Councilors not found</p>;
  }

  return councilors.map((m: CouncilorType, i: number) => (
    <LeaderCard
      key={m.name + i}
      name={m.name}
      position={m.role}
      bio={m.bio}
      image={m.image}
      tenure={m.tenure}
      showExtra
      type="councilor"
      ward={m.ward}
    />
  ));
}
