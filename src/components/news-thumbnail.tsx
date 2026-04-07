"use client";

import { deleteBlogPost, publishNews } from "@/lib/actions/news.actions";
import { checkLength } from "@/lib/utils";
import { NewsType } from "@/types";
import { CalendarDays, Edit, PowerCircle, Trash, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import Spinner from "./spinner";
import { cloudinaryImageUrl } from "@/env";
import { cleanText, cn } from "@/lib/utils";

export default function NewsThumbnail({
  news,
  isEditable = false,
}: {
  news: NewsType[];
  isEditable?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  if (!news.length) {
    return <h1 className="text-xl font-light ml-16">No news found!</h1>;
  }

  return news.map((n, i) => {
    return (
      <div key={n.title + i} className=" group relative min-h-105">
        <div className="relative md:w-75 h-50 overflow-hidden">
          <Image
            src={`${cloudinaryImageUrl}${n.banner}`}
            alt="banner"
            fill
            className="object-cover group-hover:scale-105 transition-all duration-300 ease-in"
            sizes="(max-width: 7680x) 100vw, 25vw"
          />
          <div className="py-1 px-2 bg-app-blue text-white text-xs text-center rounded-full absolute top-5 right-5 z-20">
            {n.category}
          </div>
        </div>

        <div className="p-2">
          <h1 className="text-xl font-bold capitalize">
            {checkLength(n.title, 50)}
          </h1>
          <h3 className="text-lg font-semibold">
            {" "}
            {checkLength(n.excerpt, 30)}
          </h3>

          <span className="p-text group-hover:text-app-blue">
            {cleanText(checkLength(n.content, 80))}
          </span>
        </div>

        {/* footer */}
        <div className=" absolute bottom-0 left-0 right-0 w-full flex items-center justify-between p-2 bg-app-dark-green text-white group-hover:animate-pulse text-xs">
          <div className="inline-flex items-center space-x-1">
            <User size={16} />
            <p>{n.author}</p>
          </div>

          <div className="inline-flex items-center space-x-1">
            <CalendarDays size={16} />
            <p>{new Date(n.date).toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Overlay */}
        <div className="hidden bg-black/50 absolute size-full inset-0 group-hover:flex flex-col items-center justify-center group-hover:animate-slide-up">
          <Link
            className="bg-app-blue text-white hover:bg-blue-700 p-4 border border-white cursor-pointer"
            href={`/news/${n.title}/read`}
          >
            Read
          </Link>

          {isEditable && (
            <div className="flex items-center space-x-4 mt-6">
              <Link href={`/dashboard/news/${n.slug}/edit`}>
                <Edit className="text-white font-bold text-2xl cursor-pointer" />
              </Link>

              {!isPending ? (
                <div className="flex space-x-8">
                  <button
                    onClick={() =>
                      startTransition(async () => {
                        await publishNews(n.slug, !n.isPublished);
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
                        await deleteBlogPost(n.id);
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
          )}
        </div>
      </div>
    );
  });
}
