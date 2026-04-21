import { LeaderCard } from "@/components/leader-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { positions } from "@/lib/constants";
import { getCachedExecutives } from "@/lib/DAL/cache";
import { lc } from "@/lib/utils";
import { ExecutiveType } from "@/types";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin | Executives",
};

const ExecutivesPage = () => {
  return (
    <section>
      <MaxWidthWrapper className="p-y">
        <Link href={"/dashboard/leaders/executives/new"}>
          <PlusSquare className="size-10" />
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <Suspense fallback={<p>Loading exec..</p>}>
            <RenderExecutives />
          </Suspense>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default ExecutivesPage;

async function RenderExecutives() {
  const executiveMembers = await getCachedExecutives();
  if (!executiveMembers) return notFound();

  return (
    <>
      {executiveMembers
        .filter(
          (e: { position: string; past: boolean }) =>
            !e.past && lc(e.position) !== positions.councilor,
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
            isPast={m.isPast}
            type="executive"
            editHref={`/dashboard/leaders/executives/${m.name}/edit`}
          />
        ))}
    </>
  );
}
