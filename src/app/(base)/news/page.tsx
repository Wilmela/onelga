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

