import NewsComp from "@/components/new-comp";
import PageBanner from "@/components/page-banner";
import { NewsSkeleton } from "@/components/skeletons";

import { Metadata } from "next";

import { Suspense } from "react";

export const metadata: Metadata = {
  title: "News",
};

const NewsPage = () => {
  return (
    <section>
      <PageBanner />

      <Suspense
        fallback={
          <>
            <NewsSkeleton />
          </>
        }
      >
        <NewsComp  />
      </Suspense>
    </section>
  );
};

export default NewsPage;

// async function RenderNews() {
//   const data = await getCachedNews();

//   if (!data.length) {
//     return <p>No news found</p>;
//   }

//   const publishedNews: NewsType[] = data.filter((n: NewsType) => n.isPublished);

//   return <NewsComp  />;
// }
