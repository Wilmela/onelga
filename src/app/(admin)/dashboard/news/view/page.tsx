import MaxWidthWrapper from "@/components/max-width-wrapper";
import NewsThumbnail from "@/components/news-thumbnail";
import { NewsSkeleton } from "@/components/skeletons";
import { getCachedNews } from "@/lib/DAL/cache";
import { Suspense } from "react";

const ViewNewsPage = () => {
  return (
    <section>
      <MaxWidthWrapper className="p-y ">
        <Suspense
          fallback={
            <>
              <NewsSkeleton />
            </>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-y">
            <RenderNews />
          </div>
        </Suspense>
      </MaxWidthWrapper>
    </section>
  );
};

export default ViewNewsPage;

async function RenderNews() {
  const news = await getCachedNews();

  if (!news.length) {
    return <p>No news found.</p>;
  }

  return <NewsThumbnail news={news} isEditable />;
}
