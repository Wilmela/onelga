"use client";

import { NAVLINKS } from "@/lib/constants";
import Logo from "./logo";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import { siteConfig } from "@/site-config";
import Socials from "./socials";
import { ArrowUp } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Button } from "./ui/button";
import CopyDate from "./copy-date";

const LINK_HEADING = [
  { title: "Links", links: NAVLINKS },
  {
    title: "Leadership",
    links: [
      { title: "Exectutive", href: "/leadership/executives" },
      { title: "Councilors", href: "/leadership/councilors" },
      { title: "Past Leaders", href: "/leadership/past-leaders" },
      // { title: "Committee", href: "/leadership/committee" },
    ],
  },
  {
    title: "Explore",
    links: [
      { title: "Services", href: "#services" },
      { title: "Statistics", href: "#stat" },
      { title: "Landmarks", href: "#landmark" },
      { title: "Chairman", href: "#chairman" },
      { title: "Map", href: "#map" },
    ],
  },
  { title: "Legal", links: [{ title: "Privacy", href: "/privacy" }] },
];

const Footer = () => {
  const [showBtn, setShowBtn] = useState(false);

  function toggleShow() {
    if (window.scrollY > 100) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", toggleShow);

    return () => document.removeEventListener("scroll", toggleShow);
  }, []);

  return (
    <footer className="bg-app-dark-green">
      <MaxWidthWrapper className="p-y">
        <div className="flex flex-col md:flex-row flex-1  justify-between ">
          <div className="md:flex-[0.3] ">
            <Logo />

            <p className="p-text text-white max-w-[35ch] my-4">
              {siteConfig.description}
            </p>

            <div className="mb-4 md:mb-0">
              <h3 className="text-white font-semibold mb-4">SOCIALS</h3>
              <Socials />
            </div>
          </div>

          {/* Headings */}
          <div className="md:flex-[0.7] col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4  ">
              {LINK_HEADING.map((l) => (
                <div key={l.title} className="space-y-6">
                  <h1 className="font-bold text-white">{l.title}</h1>

                  <div className="flex flex-col space-y-2">
                    {l.links.map((l) => (
                      <Link
                        href={l.href}
                        className="text-white p-text"
                        key={l.title}
                      >
                        {l.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      <section className="bg-black">
        <MaxWidthWrapper className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4">
            <Suspense fallback={null}>
              <CopyDate />
            </Suspense>
            {/* <div className="inline-flex items-center space-x-4">
              {["privacy", "accesibility"].map((i) => (
                <Link
                  href={`/${i}`}
                  className="p-text text-white hover:underline"
                  key={i}
                >
                  {i}
                </Link>
              ))}
            </div> */}
            <Link
              href={`mailto:techmelaservices@gmail.com?subject='Enquiry'`}
              className="p-text text-white hover:underline"
            >
              D&D: With ❤️ By Techmela Services
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>

      {showBtn ? (
        <Button
          variant={"ghost"}
          onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
          className="fixed bottom-10 right-5 z-40 bg-app-blue flex items-center justify-center size-8 rounded-full hover:bg-blue-700 hover:-translate-y-1 cursor-pointer transition-all duration-300 ease-in"
          aria-label="Back to top"
        >
          <ArrowUp className="text-white size-6" />
        </Button>
      ) : null}
    </footer>
  );
};

export default Footer;
