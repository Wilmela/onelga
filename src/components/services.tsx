"use client";
import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import { ArrowRight, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { services } from "@/lib/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Services = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (container == null || typeof window == "undefined") return;

      // const items = document.querySelectorAll("#card");
      const items = gsap.utils.toArray<HTMLElement>("#card");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          {
            y: -10 + items.indexOf(item),
            rotation: 360,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            ease: "back.in",

            scrollTrigger: {
              trigger: item,
              start: "top 60%",
              end: "bottom 80%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: container },
  );
  return (
    <section className="bg-app-blue/10 border-b" id="explore">
      <MaxWidthWrapper className="p-y md:h-90" id="services">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          ref={container}
        >
          {services.map((s, i) => {
            return (
              <ServiceCard
                key={s.title + i}
                Icon={s.Icon}
                title={s.title}
                // color={s.color}
                href={s.href}
                id={"card"}
              />
            );
          })}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Services;

type Props = {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  // color: string;
  href: string;
  id?: string;
};
function ServiceCard({ Icon, title, href, id }: Props) {
  return (
    <Link
      id={id}
      href={href}
      className="flex flex-col items-center justify-center space-y-4 hover:scale-105 cursor-pointer transition-all duration-300 ease-in group bg-app-blue rounded-md h-50 md:h-60"
    >
      <div className="bg-white/10 size-16 md:size-20 rounded-full flex items-center justify-center">
        <Icon className={cn("size-8 md:size-12 text-white")} />
      </div>
      <h3 className={cn("font-light text-sm md:text-xl", `text-white`)}>
        {title}
      </h3>

      <div className="text-app-blue text-light text-center transition-all duration-300 ease-out text-sm px-6 py-1 bg-white/10 rounded-full hover:bg-blue-500/10 opacity-0  group-hover:opacity-100 ">
        <ArrowRight className="text-bold size-4 text-white" />
      </div>
    </Link>
  );
}
