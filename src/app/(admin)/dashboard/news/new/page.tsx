import NewsForm from "@/components/news-form";
import React, { Suspense } from "react";

const NewPage = () => {
  return (
    <Suspense fallback={<p>loading..</p>}>
      <NewsForm type="Create" />
    </Suspense>
  );
};

export default NewPage;
