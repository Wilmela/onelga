import MaxWidthWrapper from "./max-width-wrapper";
import SectionHeader from "./section-header";
import { NewsType } from "@/types";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
import { getCachedNews } from "@/lib/DAL/cache";
import { checkLength } from "@/lib/constants";
import { cleanText } from "@/lib/utils";
import { cloudinaryImageUrl } from "@/env";

const FeaturedNews = () => {
  return (
    <section>
      <MaxWidthWrapper className="p-y">
        <div className="flex justify-between items-center">
          <SectionHeader
            title="Latest News"
            description="Stay up to date with interesting happenings"
          />

          <Link
            href={`/news/`}
            className="text-accent-foreground hover:text-app-blue cursor-pointer infline-flex w-30"
          >
            More News &rarr;
          </Link>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LatestNewsCard />
          </div>
        </Suspense>
      </MaxWidthWrapper>
    </section>
  );
};

export default FeaturedNews;

async function LatestNewsCard() {
  const news = await getCachedNews();
  if (!news.length) {
    return <p>No news found</p>;
  }

  return news.map((n: NewsType) => (
    <div
      key={n.title}
      className="group relative overflow-hidden rounded-lg hover:shadow-2xl hover:translate-y-1 transition-all ease-in-out duration-300 cursor-pointer"
    >
      <div className="relative h-100 md:h-125 w-full ">
        <Image
          src={`${cloudinaryImageUrl}${n.banner}`}
          alt="banner"
          fill
          className="object-cover"
          sizes="(max-width:768px) 100wv, 45wv"
        />

        <div className="absolute bg-app-blue z-10 right-5 top-5 text-white rounded-full px-4 py-1 text-xs">
          {n.category}
        </div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 bg-black/40 p-2 pb-16">
        <h1 className="text-white font-bold text-xl uppercase">{n.title}</h1>
        <h2 className="text-white font-semibold text-lg">{n.excerpt}</h2>
        <span className="p-text text-white">
          {cleanText(checkLength(n.content, 200))}
        </span>
      </div>
      <div className="bg-black/90 flex justify-end p-4">
        <Link
          href={`/news/${n.title}/read`}
          className="text-white hover:text-app-blue cursor-pointer z-30"
        >
          Read more &rarr;
        </Link>
      </div>
    </div>
  ));
}
