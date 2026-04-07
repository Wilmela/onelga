"use client";

import { ProjectType } from "@/types";
import Image from "next/image";
import EditTab from "./edit-tab";
import {
  deleteProject,
  toggleProjectCompletion,
} from "@/lib/actions/projects.actions";
import { cloudinaryImageUrl } from "@/env";
import { PowerCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProjectCard({
  _id,
  imageUrl,
  title,
  status,
  location,
  date,
  description,
  isEditable,
}: ProjectType) {
  return (
    <div className="w-full">
      <div className="relative w-full h-75 md:h-85 group">
        <Image
          src={`${cloudinaryImageUrl}${imageUrl}`}
          alt="project"
          fill
          className="object-cover"
          sizes="(max-width: 7680x) 100vw, 25vw"
        />

        <div className="hidden group-hover:flex flex-col items-center justify-center size-full absolute inset-0 group-hover:animate-slide-up bg-black/40 overflow-hidden">
          <p className="text-lg font-bold text-white">{title}</p>

          <div className="pt-2 flex flex-col text-white text-center">
            <h3>{description}</h3>
            <p>{location}</p>
            <p>{date}</p>
          </div>
        </div>

        {isEditable && (
          <button
            onClick={async () => await toggleProjectCompletion(title, !status)}
            className="absolute top-5 left-5 text-white text-xs"
          >
            <PowerCircle
              className={cn(
                "cursor-pointer",
                status ? "text-red-500" : "text-green-500",
              )}
            />
          </button>
        )}
        {
          <div className="absolute top-5 right-5 bg-app-blue py-1 px-2 rounded-full text-white text-xs">
            {status ? "Completed" : "Ongoing"}
          </div>
        }
      </div>
      <EditTab
        editHref={`/dashboard/projects/${_id}/edit`}
        onDelete={async () => await deleteProject(title)}
        isEditable={isEditable}
      />
    </div>
  );
}

export function ProjectSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 w-full h-75 md:size-100" />
    </div>
  );
}
