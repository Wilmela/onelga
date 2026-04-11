"use client";

import { OTHER_CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Contacts = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const tl = gsap.timeline({
    delay: 1,
    repeat: -1,
    yoyo: true,
    // reversed: true,
  });

  useGSAP(
    () => {
      if (typeof window === "undefined" || container === null) return;

      tl.to(".image", {
        x: -50,
        duration: 0.5,
        ease: "power1.in",
      });
      tl.to(".image", {
        x: 0,
        duration: 0.5,
      })
        .to(".image", {
          y: 30,
          duration: 0.5,
          ease: "bounce.inOut",
        })
        .to(".image", {
          y: 0,
          duration: 0.5,
          delay: 1,
        })
        .to(".image", {
          x: 50,
          duration: 0.5,
          ease: "power1.out",
        })
        .to(".image", {
          x: 0,
          duration: 0.5,
          ease: "power1.out",
        });
    },
    { scope: container },
  );

  return (
    <div
      className="flex flex-col space-y-8 md:space-y-12 items-center"
      ref={container}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
        {OTHER_CONTACT.map((c) => (
          <div
            key={c.title}
            className="bg-white p-4 rounded-md shadow hover:shadow-2xl cursor-pointer group"
          >
            <div className="flex items-center space-x-4 space-y-6">
              <div
                className={cn(
                  "rounded-full size-14 flex items-center justify-center",
                  c.bg,
                )}
              >
                <c.Icon className="size-7 text-white group-hover:scale-105 transition-all" />
              </div>
              <h3 className="font-bold text-lg md:text-xl">{c.title}</h3>
            </div>

            <div>
              <p className="p-text font-semibold">{c.description}</p>
              <p className="p-text">{c.contact}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative size-40 image">
        <Image
          src={"/images/logo.png"}
          fill
          alt="logo"
          className="bg-white"
          sizes="100px"
        />
      </div>

      <p className="p-text">Expect to hear from us within 24 - 48 hours</p>
    </div>
  );
};

export default Contacts;
