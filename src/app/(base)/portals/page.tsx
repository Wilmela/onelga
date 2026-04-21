import MaxWidthWrapper from "@/components/max-width-wrapper";
import PageBanner from "@/components/page-banner";
import SectionHeader from "@/components/section-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portals",
};
const TaxPortal = () => {
  return (
    <section>
      <PageBanner />
      <MaxWidthWrapper className="p-y">
        <SectionHeader
          title="Portals"
          description="ONELGA Digital Revenue Online platform"
        />

        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold">Portal not open yet.</h1>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default TaxPortal;
