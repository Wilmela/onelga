import { LeaderCard } from "@/components/leader-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { positions } from "@/lib/constants";
import { getCachedExecutives } from "@/lib/DAL/cache";
import { lc } from "@/lib/utils";
import { ExecutiveType } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin | Past Leadership",
};
const PastLeadersPage = () => {
  return (
    <section>
      <MaxWidthWrapper className="p-y">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <Suspense fallback={<p>Loading past exe...</p>}>
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

  return (
    <>
      {executiveMembers
        .filter(
          (e: { isPast: boolean; position: string }) =>
            e.isPast && lc(e.position) === positions.chairman,
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
            isEditable={true}
            editHref={`/dashboard/leaders/executives/${m.name}/edit`}
            type="executive"
          />
        ))}
    </>
  );
}
