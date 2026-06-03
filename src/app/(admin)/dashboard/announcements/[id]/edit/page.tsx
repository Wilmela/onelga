import AnnouncementForm from "@/features/announcements/components/announcement-form";
import { getCachedAnnouncements } from "@/lib/DAL/cache";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin | Edit Announcement ",
};
const EditAnnouncementPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <RenderNew params={params} />
    </Suspense>
  );
};

export default EditAnnouncementPage;

async function RenderNew({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const announcement = (await getCachedAnnouncements()).find(
    (n: { id: string }) => n.id === id,
  );

  if (!announcement) return notFound();

  return <AnnouncementForm type="Update" announcement={announcement} />;
}
