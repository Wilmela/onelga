"use client";

import { Megaphone, PowerCircle, Trash, Calendar, Edit } from "lucide-react";
import React, { useTransition } from "react";
import { fullDate } from "./copy-date";
import { cleanText, cn } from "@/lib/utils";
import {
  deleteAnnouncement,
  publishAnnouncement,
} from "@/lib/actions/announcement.actions";
import Spinner from "./spinner";
import { AnnouncementType } from "@/types";
import Link from "next/link";

type Props = AnnouncementType & { isEditable?: boolean };

const AnnouncementCard = ({
  _id,
  title,
  date,
  isPublished,
  content,
  isEditable,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="group relative flex flex-col min-h-62.5 bg-white border border-slate-200 hover:border-app-blue/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Header Bar */}
      <div className="h-2 bg-app-blue w-full" />

      <div className="p-5 flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-app-blue/10 rounded-lg text-app-blue">
            <Megaphone size={24} />
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium bg-slate-100 px-2.5 py-1 rounded-full">
            <Calendar size={14} />
            {fullDate(date)}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800 leading-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-4 wrap-break-word">
            {cleanText(content)}
          </p>
        </div>
      </div>

      {/* Admin Actions - Fixed for Mobile & Desktop */}
      {isEditable && (
        <div
          className="flex items-center justify-end gap-3 p-3 bg-slate-50 border-t border-slate-100 
                        transition-all duration-300 
                        md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
        >
          {!isPending ? (
            <>
              <button
                title={isPublished ? "Unpublish" : "Publish"}
                className="p-2 hover:bg-white rounded-full transition-colors shadow-sm border border-transparent hover:border-slate-200"
                onClick={() =>
                  startTransition(async () => {
                    await publishAnnouncement(_id, !isPublished);
                  })
                }
              >
                <PowerCircle
                  size={20}
                  className={cn(
                    "transition-colors",
                    isPublished ? "text-green-600" : "text-slate-400",
                  )}
                />
              </button>

              <Link
                href={`/dashboard/announcements/${_id}/edit`}
                title="Edit"
                className="p-2 hover:bg-red-50 rounded-full transition-colors shadow-sm border border-transparent hover:border-red-100"
              >
                <Edit size={20} className="text-blue-500" />
              </Link>
              <button
                title="Delete"
                className="p-2 hover:bg-red-50 rounded-full transition-colors shadow-sm border border-transparent hover:border-red-100"
                onClick={() =>
                  startTransition(async () => {
                    await deleteAnnouncement(_id);
                  })
                }
              >
                <Trash size={20} className="text-red-500" />
              </button>
            </>
          ) : (
            <div className="pr-4">
              <Spinner />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnnouncementCard;
