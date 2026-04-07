"use client";
import Image from "next/image";
import EditTab from "./edit-tab";
import {
  deleteExecutive,
  togglePastExecutive,
} from "@/lib/actions/executive.actions";
import { cloudinaryImageUrl } from "@/env";
import { PowerCircle } from "lucide-react";
import { cn, lc, positions } from "@/lib/utils";
import { deleteCouncilor } from "@/lib/actions/councilor.actions";

type Props = {
  image: string;
  name: string;
  position: string;
  bio: string;
  tenure: string;
  showExtra?: boolean;
  isEditable?: boolean;
  isPast?: boolean;
  type: "executive" | "councilor";
  editHref?: string;
};
export function LeaderCard({
  image,
  name,
  position,
  bio,
  tenure,
  showExtra,
  isEditable,
  isPast = false,
  type,
  editHref,
}: Props) {
  async function switchType() {
    switch (type) {
      case "executive":
        await deleteExecutive(name);
        break;
      case "councilor":
        await deleteCouncilor(name);
        break;
      default:
        break;
    }
  }
  return (
    <div>
      <div className="relative w-full h-75 ">
        <Image
          src={`${cloudinaryImageUrl}${image}`}
          alt={name}
          fill
          className="object-contain bg-white"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {isEditable && lc(position) === positions.chairman && (
          <span className="absolute top-5 left-5 z-10 ">
            <button
              onClick={async () => await togglePastExecutive(name, !isPast)}
            >
              <PowerCircle
                className={cn(
                  "cursor-pointer",
                  isPast ? "text-red-500" : "text-green-500",
                )}
              />
            </button>
          </span>
        )}
      </div>
      <div className="space-y-2 mt-4 min-h-55">
        <h3 className="text-xl md:text-2xl font-bold">{name}</h3>
        <h3 className="text-lg md:text-xl font-semibold">{position}</h3>
        {showExtra && <p className="w-full max-w-[50ch] p-text">{bio}</p>}
        <p>{tenure}</p>
      </div>

      <EditTab
        editHref={editHref as string}
        onDelete={async () => await switchType()}
        isEditable={isEditable}
      />
    </div>
  );
}
