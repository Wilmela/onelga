import { LeaderCard } from "@/components/leader-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { getCachedCouncilors } from "@/lib/DAL/cache";
import { CouncilorType } from "@/types";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin | Councilors Leadership ",
};
const CouncilorsPage = () => {
  return (
    <section>
      <MaxWidthWrapper className="p-y">
        <Link href={"/dashboard/leaders/councilors/new"}>
          <PlusSquare className="size-10" />
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          <Suspense fallback={<p>Loading councilors...</p>}>
            <RenderCouncilors />
          </Suspense>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default CouncilorsPage;

async function RenderCouncilors() {
  const councilors = await getCachedCouncilors();

  if (!councilors.length) {
    return <p>Councilors not found</p>;
  }

  return (
    <>
      {councilors
        .filter((m: { position: string; isPast: boolean }) => !m.isPast)
        .map((m: CouncilorType, i: number) => (
          <LeaderCard
            key={m.name + i}
            name={m.name}
            position={m.role}
            bio={m.bio}
            image={m.image}
            tenure={m.tenure}
            showExtra={false}
            isEditable={true}
            type="councilor"
            ward={m.ward}
            editHref={`/dashboard/leaders/councilors/${m.name}/edit`}
          />
        ))}
    </>
  );
}
