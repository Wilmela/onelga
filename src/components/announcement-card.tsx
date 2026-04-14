"use client";

import { AnnouncementType } from "@/types";
import { Megaphone, PowerCircle, Trash } from "lucide-react";

import { useRef, useTransition } from "react";
import Spinner from "./spinner";
import { cleanText, cn } from "@/lib/utils";
import {
  deleteAnnouncement,
  publishAnnouncement,
} from "@/lib/actions/announcement.actions";
import gsap from "gsap";

import { useGSAP } from "@gsap/react";
import { fullDate } from "./copy-date";

gsap.registerPlugin(useGSAP);

export default function Announcementcard({
  announcements,
  isEditable = false,
}: {
  announcements: AnnouncementType[];
  isEditable?: boolean;
}) {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!container === null || typeof window == "undefined") return;

      const cards = gsap.utils.toArray<HTMLElement>(".news-card");

      cards.forEach((card) => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.7,
          repeat: -1,
          yoyo: true,
          stagger: 0.1,
          ease: "bounce.in",
        });
      });
    },
    { dependencies: [announcements] },
  );
  const [isPending, startTransition] = useTransition();

  return announcements.map((n, i) => {
    return (
      <div
        key={n.title + i}
        className="group relative min-h-50 bg-app-blue/5 rounded-md overflow-hidden"
      >
        <div className="h-14 bg-app-blue flex items-center justify-between px-4">
          <Megaphone size={40} className=" text-white" />

          <div className="p-2 bg-white/10 rounded-full text-white text-xs inline-flex items-center justify-center  z-20">
            {fullDate(n.date)}
          </div>
        </div>

        <div className="p-2 space-y-6">
          <h3 className="text-3xl text-bold">{n.title}</h3>
          <span className="p-text wrap-break-word group-hover:text-app-blue">
            {cleanText(n.content)}
          </span>
        </div>

        {/* Overlay */}
        {isEditable && (
          <div className="hidden bg-black/50 absolute size-full inset-0 group-hover:flex flex-col items-center justify-center group-hover:animate-slide-up">
            <div className="flex items-center space-x-4 mt-6">
              {!isPending ? (
                <div className="flex space-x-8">
                  <button
                    onClick={() =>
                      startTransition(async () => {
                        await publishAnnouncement(n.id, !n.isPublished);
                      })
                    }
                  >
                    <PowerCircle
                      className={cn(
                        "font-bold text-2xl cursor-pointer",
                        n.isPublished ? "text-green-500" : "text-red-500 ",
                      )}
                    />
                  </button>

                  <button
                    onClick={() =>
                      startTransition(async () => {
                        await deleteAnnouncement(n.id);
                      })
                    }
                  >
                    <Trash className="text-red-500 font-bold text-2xl cursor-pointer" />
                  </button>
                </div>
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        )}
      </div>
    );
  });
}
