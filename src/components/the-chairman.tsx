import { Suspense } from "react";
import SectionHeader from "./section-header";
import Image from "next/image";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import { getCachedExecutives } from "@/lib/DAL/cache";
import { lc, positions } from "@/lib/utils";
import { cloudinaryImageUrl } from "@/env";

const TheChairman = () => {
  return (
    <section>
      <MaxWidthWrapper className="p-y" id="chairman">
        <SectionHeader
          title="The Executive Chairman"
          description="Meet the Chairman steering the vision for Ogba/Egbema/Ndoni Local Government Area."
        />

        <Suspense
          fallback={
            <>
              <ChairmanSkeleton />
            </>
          }
        >
          <RenderChairman />
        </Suspense>
      </MaxWidthWrapper>
    </section>
  );
};

export default TheChairman;

async function RenderChairman() {
  const data = await getCachedExecutives();

  if (!data.length) {
    return (
      <ChairmanComp
        name="High Chief Hon. Barr. Chukwu Ogbogu Shedrack, DSSRS, PhD"
        imageUrl="/images/chairman.jpg"
      />
    );
  }

  const chairman = data.find(
    (c: { position: string }) => lc(c.position) === positions.chairman,
  );

  return (
    <ChairmanComp
      name={chairman.name}
      imageUrl={`${cloudinaryImageUrl}${chairman.image}`}
    />
  );
}

function ChairmanComp({ name, imageUrl }: { name: string; imageUrl: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
      <div className="col-span-1 md:col-span-4 space-y-6">
        <h1 className="font-light text-3xl">{name}</h1>

        <p className="p-text">
          is the Executive Chairman of Ogba-Egbema-Ndoni Local Government Area
          (ONELGA). A distinguished legal luminary and public servant born in
          1965, he brings over three decades of experience to his role. His
          extensive academic background includes a Bachelor of Education, a
          Bachelor of Laws, a Master&apos;s in Political Science, and a PhD in
          Public Relations and Conflict Resolution, providing him with a unique
          multidisciplinary approach to modern governance and administration.
          <br />
          <br />
          Throughout his career, Dr. Shedrack has held pivotal leadership
          positions across the community, state, and political sectors. He rose
          from grassroots advocacy as the Secretary General of the Egi Youth
          Federation to high-ranking state roles, serving as the Rivers State
          Commissioner for both Energy and Power. His political leadership is
          equally notable, having served as the State Financial Secretary and
          the Vice Chairman (Rivers West) for the People&apos;s Democratic Party
          (PDP). These roles, combined with his experience as a Community
          Relations Manager, have honed his ability to foster harmony between
          industries and host communities.
          <br />
          <br />
          As the Executive Chairman of ONELGA, Dr. Shedrack is currently
          implementing a visionary governance framework centered on five
          strategic pillars: infrastructural modernization, enhanced healthcare,
          economic empowerment through agriculture and entrepreneurship, quality
          education, and the promotion of sustainable peace. A devoted
          Christian, Knight of the Anglican Church, and a father of seven, his
          leadership is defined by integrity and a commitment to transparent,
          inclusive governance. He remains dedicated to writing a bold new
          chapter of progress and socio-economic advancement for the people of
          ONELGA.
        </p>

        <Link
          className=" hover:text-app-blue hover:border rounded-2xl p-2"
          href="/leadership"
        >
          Learn More About the Leadership &rarr;
        </Link>
      </div>

      <div className="relative h-125 md:size-full col-span-1 md:col-span-3 overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt="chairman"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    </div>
  );
}

function ChairmanSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-8 bg-gray-100 animate-pulse">
      <div className="col-span-1 md:col-span-4 space-y-6">
        <h1 className="font-light text-3xl"></h1>

        <div className="h-25 bg-gray-50"></div>

        <div className="bg-gray-100 "></div>
      </div>

      <div className="relative h-125 md:size-full col-span-1 md:col-span-3 overflow-hidden rounded-2xl bg-gray-50">
        <div />
      </div>
    </div>
  );
}
