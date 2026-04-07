import GalleryComp from "@/components/gallery-comp";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import NewsThumbnail from "@/components/news-thumbnail";
import SectionHeader from "@/components/section-header";
import { cloudinaryImageUrl } from "@/env";
import { getNewByTitle } from "@/lib/actions/news.actions";
import { getCachedNews } from "@/lib/DAL/cache";
import { cleanText } from "@/lib/utils";
import { CalendarRange, User } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ title: string }>;
}

// export async function generateStaticParams() {
//   const allNews = await getCachedNews();
//   return allNews.map((n: { title: string }) => ({
//     title:n.title,
//   }));
// }

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { title } = await params;

  const news = await getNewByTitle(decodeURIComponent(title));

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: news.title,
    openGraph: {
      images: [
        {
          url: `${cloudinaryImageUrl}${news.banner}`,
          width: 1200,
          height: 630,
          alt: news.title,
        },
        ...previousImages,
      ],
      title: news.title,
      description: news.excerpt,
      type: "article",
      publishedTime: news.date,
      authors: ["ONELGA MEDIA"],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.excerpt,
    },
  };
}

const ReadNews = async ({ params }: Props) => {
  return (
    <section>
      <Suspense fallback={<p>Loading news</p>}>
        <RenderNews params={params} />
      </Suspense>
    </section>
  );
};

export default ReadNews;

async function RenderNews({ params }: Props) {
  const title = (await params).title;

  const allNews = await getCachedNews();

  const news = allNews.find(
    (n: { title: string }) => n.title === decodeURIComponent(title),
  );

  if (!news) return notFound();

  // Related news
  const sameCatNews =
    allNews
      .filter(
        (n: { category: string; title: string }) =>
          n.category === news.category && n.title !== news.title,
      )
      .slice(0, 4) || [];

  return (
    <>
      <MaxWidthWrapper className="flex flex-col items-center justify-center h-90 md:h-75 w-full bg-app-dark-green">
        <div className="text-center space-y-6 mx-auto w-full max-w-4xl mt-28 md:mt-20 mb-8 md:mb-0">
          <div className="text-white ">
            <h1 className="capitalize text-2xl md:text-3xl font-bold">
              {news.title}
            </h1>
            <h3 className="text-lg md:text-xl font-light mt-4">
              {news.excerpt}
            </h3>
          </div>
          <div className="text-white text-sm text-light flex flex-col items-center space-y-2">
            <span className="inline-flex space-x-2 justify-center items-center">
              <User />
              <p>{news.author}</p>
            </span>
            <span className="inline-flex space-x-2 justify-center items-center">
              <CalendarRange />
              <p>{news.date.split("T")[0]}</p>
            </span>
          </div>
        </div>
      </MaxWidthWrapper>

      <div className="relative w-full h-75 md:h-100">
        <Image
          src={`${cloudinaryImageUrl}${news.banner}`}
          alt="banner"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <MaxWidthWrapper className="space-y-8 p-y">
        {/* ADVERT */}
        <div className="mx-auto relative w-full md:w-4xl h-40 ">
          <Image
            src={"/images/sec.jpeg"}
            alt="banner"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="mx-auto w-full max-w-[90ch]">
          {cleanText(news.content)}
        </div>

        {/* GALLERY */}
        <div className="mt-10 ">
          <Suspense
            fallback={
              <>
                <PhotoSkeleton />
                <PhotoSkeleton />
                <PhotoSkeleton />
                <PhotoSkeleton />
              </>
            }
          >
            <GetGalleryItems shots={news.shots} />
          </Suspense>
        </div>
      </MaxWidthWrapper>

      {/* Related news */}
      <MaxWidthWrapper className="p-y">
        <SectionHeader
          title="Related News"
          description="view other news update in this category."
        />

        <Suspense fallback={<p>Loading...</p>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <NewsThumbnail news={sameCatNews} />
          </div>
        </Suspense>

        {/* Gallery */}
      </MaxWidthWrapper>
    </>
  );
}

type ShotType = { id: string; link: string };
async function GetGalleryItems({ shots }: { shots: ShotType[] }) {
  if (!shots.length) return;

  const items = shots.map((r: ShotType) => ({
    original: r.link,
    thumbnail: r.link,
    // description: cleanText(r.link) as string,
  }));

  return <GalleryComp items={items} />;
}

function PhotoSkeleton() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[70%] h-[80%] animate-pulse bg-gray-200 grid grid-cols-2 gap-6 p-8">
        <div className="bg-gray-300 animate-pulse" />
        <div className="bg-gray-300 animate-pulse" />
        <div className="bg-gray-300 animate-pulse" />
        <div className="bg-gray-300 animate-pulse" />
      </div>
    </div>
  );
}
