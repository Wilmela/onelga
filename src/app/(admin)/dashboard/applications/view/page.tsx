import MaxWidthWrapper from "@/components/max-width-wrapper";
import { cachedJobPostings } from "@/lib/DAL/cache";
import { ApplicationPostingFormDataType } from "@/lib/validations";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Application | View",
};
const ViewAppliacitonsPage = async () => {
  return (
    <section>
      <MaxWidthWrapper>
        <Suspense fallback={<p>Loading...</p>}>
          <RenderJobPostings />
        </Suspense>
      </MaxWidthWrapper>
    </section>
  );
};

export default ViewAppliacitonsPage;

async function RenderJobPostings() {
  const postings: ApplicationPostingFormDataType[] = await cachedJobPostings();

  return (
    <div>
      {postings.map((p: ApplicationPostingFormDataType) => (
        <div key={p.position}>
          <p>{p.title}</p>
        </div>
      ))}
    </div>
  );
}
