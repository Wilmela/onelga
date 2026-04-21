import { LeaderCard } from "@/components/leader-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import PageBanner from "@/components/page-banner";
import SectionHeader from "@/components/section-header";
import { cloudinaryImageUrl } from "@/env";
import { positions } from "@/lib/constants";
import { getCachedExecutives } from "@/lib/DAL/cache";
import { lc } from "@/lib/utils";
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
  const vice = executiveMembers.find(
    (u: { position: string }) => lc(u.position) === positions.vicechairman,
  );
  const secretary = executiveMembers.find(
    (u: { position: string; isPast: boolean }) =>
      lc(u.position) === positions.secretary,
  );

  const allowedRoles = [
    "vice chairman",
    "secretary general",
    "public relations officer (p.r.o)",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* CHAIRMAN */}
      <div className="h-full md:col-span-1">
        {chairman ? (
          <>
            <div className="relative w-full h-75 md:h-125">
              <Image
                src={`${cloudinaryImageUrl}${chairman.image || "/images/logo.jpeg"} `}
                alt={"chairman"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-2 mt-4">
              <h3 className="text-xl md:text-2xl font-bold font-montserrat">
                {chairman.name}
              </h3>
              <h3 className="text-lg md:text-xl font-semibold font-roboto">
                {chairman.role}
              </h3>
              <p className="p-text text-sm leading-relaxed">{chairman.bio}</p>
              <p className="p-text font-semibold">{chairman.tenure}</p>
            </div>
          </>
        ) : (
          <p>Update the chairman&apos;s profile</p>
        )}
      </div>

      {/* top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
        <div>
          {vice && (
            <ExecCard
              imageUrl={`${cloudinaryImageUrl}${vice.image} `}
              name={vice.name}
              bio={vice.bio}
              role={vice.role}
              tenure={vice.tenure}
            />
          )}
        </div>

        <div>
          {secretary && (
            <ExecCard
              imageUrl={`${cloudinaryImageUrl}${secretary.image} `}
              name={secretary.name}
              bio={secretary.bio}
              role={secretary.role}
              tenure={secretary.tenure}
            />
          )}
        </div>
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

type Props = {
  imageUrl: string;
  name: string;
  role: string;
  bio: string;
  tenure: string;
};

function ExecCard({ imageUrl, name, role, bio, tenure }: Props) {
  return (
    <>
      <div className="relative w-full h-75 md:h-125">
        <Image
          src={`${imageUrl || "/images/logo.jpeg"} `}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-2 mt-4">
        <h3 className="text-xl md:text-2xl font-bold font-montserrat">
          {name}
        </h3>
        <h3 className="text-lg md:text-xl font-semibold font-roboto">{role}</h3>
        <p className="leading-relaxed p-text text-sm">{bio}</p>
        <p className="p-text font-semibold">{tenure}</p>
      </div>
    </>
  );
}
