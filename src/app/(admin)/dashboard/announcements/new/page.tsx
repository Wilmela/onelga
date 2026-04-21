import AnnouncementForm from "@/components/announcement-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin | Create Announcement ",
};
const NewAnnouncementPage = () => {
  return (
    <Suspense fallback={<p>loading..</p>}>
      <AnnouncementForm type="Create" />
    </Suspense>
  );
};

export default NewAnnouncementPage;
