"use client";

import MaxWidthWrapper from "./max-width-wrapper";
import Image from "next/image";
import { LucideProps } from "lucide-react";
import SectionHeader from "./section-header";
import { landmarks } from "@/lib/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Landmarks = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (container == null || typeof window == "undefined") return;

      const items = document.querySelectorAll("#items");
      items.forEach((item) => {
        gsap.to(item, {
          y: -100,
          opacity: 0,
          duration: 0.7,
          ease: "power1.inOut",

          scrollTrigger: {
            trigger: item,
            start: "top 30%",
            end: "bottom 30%",
            scrub: true,
          },
        });
      });
    },
    { scope: container },
  );

  return (
    <section >
      <MaxWidthWrapper className="p-y">
        <SectionHeader
          title="Landmarks of ONELGA"
          description="Explore the notable historical, cultural, and natural sites across the Ogba/Egbema/Ndoni Local Government Area."
        />

        {/* MOBILE */}
        <div
          className="md:hidden grid grid-cols-1 md:grid-cols-3 gap-8"
          ref={container}
        >
          {landmarks.map((l, i) => {
            return (
              <LandmarkCard
                key={l.title + i}
                title={l.title}
                description={l.description}
                imageUrl={l.imageUrl}
                Icon={l.icons}
                id={"items"}
              />
            );
          })}
        </div>

        {/* DESKTOP */}
        <div
          className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8"
          ref={container}
        >
          {landmarks.map((l, i) => {
            return (
              <DesktopLandmarkCard
                key={l.title + i}
                title={l.title}
                description={l.description}
                imageUrl={l.imageUrl}
                Icon={l.icons}
                id={"items"}
              />
            );
          })}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Landmarks;

type Props = {
  imageUrl: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
  id?: string;
};


function LandmarkCard({ imageUrl, title, description, Icon, id }: Props) {
  return (
    <div
      id={id}
      className="rounded-lg bg-white border shadow-sm overflow-hidden group hover:translate-y-1 hover:shadow-2xl duration-300 ease-in transition-all"
    >
      <div className="relative w-full h-50 group-hover:scale-105 transition-all duration-300 ease-in">
        <Image
          src={imageUrl}
          alt="banner"
          fill
          className="object-cover md:object-contain"
          sizes="(max-width: 768px) 100vw, 33wv"
        />
      </div>

      <div className="space-y-6 my-6 px-4">
        <div className="inline-flex space-x-2 items-center">
          <div className="p-2 bg-app-blue/90 rounded-full size-12 flex items-center justify-center">
            <Icon className="size-6 text-white" />
          </div>
          <h2 className="font-bold font-montserrat text-lg text-app-dark-green">{title}</h2>
        </div>

        <p className="p-text">{description}</p>
      </div>
    </div>
  );
}
function DesktopLandmarkCard({
  imageUrl,
  title,
  description,
  Icon,
  id,
}: Props) {
  return (
    <div
      id={id}
      className=" bg-white  shadow-sm overflow-hidden group hover:translate-y-1 hover:shadow-2xl duration-300 ease-in transition-all grid grid-cols-2 gap-4 items-center"
    >
      <div className="space-y-6 my-6 px-4">
        <div className="inline-flex space-x-2 items-center">
          <div className="p-2 bg-app-blue/90 rounded-full size-12 flex items-center justify-center">
            <Icon className="size-6 text-white" />
          </div>
          <h2 className="font-bold font-montserrat text-lg text-app-dark-green ">{title}</h2>
        </div>

        <p className="p-text">{description}</p>
      </div>

      <div className="relative size-full group-hover:scale-105 transition-all duration-300 ease-in ">
        <Image
          src={imageUrl}
          alt="banner"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
