import AnnouncementForm from "@/components/announcement-form";
import React, { Suspense } from "react";

const NewAnnouncementPage = () => {
  return (
    <Suspense fallback={<p>loading..</p>}>
      <AnnouncementForm type="Create" />
    </Suspense>
  );
};

export default NewAnnouncementPage;
