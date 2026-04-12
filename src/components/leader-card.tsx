"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import EditTab from "./edit-tab";
import {
  deleteExecutive,
  togglePastExecutive,
} from "@/lib/actions/executive.actions";
import { deleteCouncilor } from "@/lib/actions/councilor.actions";
import { cloudinaryImageUrl } from "@/env";
import { PowerCircle, Loader2 } from "lucide-react";
import { cn, lc, positions } from "@/lib/utils";

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
  ward?: number;
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
  ward,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [imgSrc, setImgSrc] = useState(`${cloudinaryImageUrl}${image}`);

  const handleToggleStatus = () => {
    startTransition(async () => {
      await togglePastExecutive(name, !isPast);
    });
  };

  const handleDelete = async () => {
    if (type === "executive") await deleteExecutive(name);
    if (type === "councilor") await deleteCouncilor(name);
  };

  return (
    <div className="group overflow-hidden transition-all duration-300">
      {/* Image Container with Hover Effect */}
      <div className="relative w-full h-75 overflow-hidden bg-gray-100">
        <Image
          src={imgSrc}
          alt={`Portrait of ${name}`}
          fill
          className={cn(
            "object-cover transition-transform duration-300 group-hover:scale-105",
            isPast && "grayscale opacity-80",
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgSrc("/fallback-avatar.png")} // Fallback image
        />

        {/* Status Badge Overlay */}
        {isPast && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider">
            Past Leader
          </div>
        )}

        {/* Action Button */}
        {isEditable && lc(position) === positions.chairman && (
          <div className="absolute top-5 left-5 z-10">
            <button
              onClick={handleToggleStatus}
              disabled={isPending}
              aria-label={isPast ? "Set as active" : "Set as past"}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="animate-spin text-gray-500" size={20} />
              ) : (
                <PowerCircle
                  className={cn(
                    "w-6 h-6",
                    isPast ? "text-gray-400" : "text-green-600",
                  )}
                />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-2 min-h-55 bg-white dark:bg-zinc-950">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h3>
          <span className="text-primary font-medium text-sm md:text-base inline-flex items-center gap-2">
            {type === "councilor" ? `${position} • Ward ${ward}` : position}
          </span>
        </div>

        {showExtra && (
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm line-clamp-4">
            {bio}
          </p>
        )}

        <p className="text-sm font-semibold text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800">
          {tenure}
        </p>
      </div>

      {/* Edit Tab */}
      <div className="p-4 pt-0">
        <EditTab
          editHref={editHref as string}
          onDelete={handleDelete}
          isEditable={isEditable}
        />
      </div>
    </div>
  );
}
