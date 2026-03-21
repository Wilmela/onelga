import NewsForm from "@/components/news-form";
import { getCachedNews } from "@/lib/DAL/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const EditNewsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <RenderNew params={params} />
    </Suspense>
  );
};

export default EditNewsPage;

async function RenderNew({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  const news = (await getCachedNews()).find(
    (n: { slug: string }) => n.slug === slug,
  );

  if (!news) return notFound();

  return <NewsForm type="Update" news={news} />;
}
