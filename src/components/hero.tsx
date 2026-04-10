"use client";

import Image from "next/image";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import gsap from "gsap";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/all";

gsap.registerPlugin(useGSAP, SplitText);

const Hero = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from("#h1", {
        opacity: 0,
        duration: 2,
        ease: "power1",
      });
    },
    { scope: container },
  );

  useGSAP(() => {
    const split = new SplitText("#text", { type: "words, chars" });

    gsap.from(split.words, {
      opacity: 0,
      delay: 1,
      stagger: 0.05,
      duration: 0.5,
      ease: "power1.in",
    });
  });

  useGSAP(() => {
    gsap.fromTo(
      "#btn",
      {
        opacity: 0,
        x: 100,
        delay: 1,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 2,
        ease: "bounce.out",
      },
    );
  });

  return (
    <section className="relative h-150 md:h-175 w-full z-10">
      <Image
        src="/images/sec-gate.png"
        priority
        alt="banner"
        fill
        className="object-cover z-0"
        sizes="100wv"
      />

      <div className="bg-black/20 absolute inset-0 size-full z-10" />

      <MaxWidthWrapper
        ref={container}
        className="absolute flex flex-col justify-center size-full z-20 space-y-8 md:space-y-6"
      >
        <h1 className="main-title" id="h1">
          <span className="text-sm md:text-xl lowercase font-light ">
            Welcome To
          </span>
          <br />
          <span>Ogba</span> <br />
          <span>Egbema</span> <br />
          <span>Ndoni</span> <br /> Local Government Area
        </h1>

        <p className="text-white p-text bg-black/50 w-fit" id="text">
          Powering the Nation, Welcoming the World: The Hub of Energy and
          Heritage. <br className="hidden md:block" />A Land of Infinite
          Opportunity, Anchored by Tradition and Fueled by the Wealth of the
          Earth.
        </p>

        <div className="flex items-center space-x-4" id="btn">
          <Link
            href={"#explore"}
            className={
              (buttonVariants({
                variant: "default",
              }),
              " bg-app-blue hover:bg-blue-800 rounded-full p-4 md:py-4 md:px-6 text-white font-semibold text-sm md:text-lg min-w-30 md:min-w-40 text-center")
            }
          >
            Explore
          </Link>
          <Link
            href={"/contact"}
            className={
              (buttonVariants({
                variant: "default",
              }),
              " text-white hover:text-blue-300 rounded-full p-4 md:py-4 md:px-6 font-semibold text-sm md:text-lg min-w-30 md:min-w-40 text-center")
            }
          >
            Contact Us &rarr;
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Hero;
