import DashboardPagePeader from "@/components/dashboard-page-header";
import { DataTable } from "@/components/data-table";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Spinner from "@/components/spinner";
import { lgacardColumn } from "@/features/registrations/lga-ids/components/lag-id-columns";
import { cachedLgaCards } from "@/lib/DAL/cache";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin | LGA Cards",
};
const LgaCards = () => {
  return (
    <section>
      <MaxWidthWrapper className="p-y">
        <DashboardPagePeader
          title="LGA Card Management"
          description="Manage all register LGA Cards."
          currentPage="LGA cards"
          items={[
            { href: "/", title: "Home" },
            { href: "/dashboard/registrations", title: "Registrations" },
          ]}
        />
        <Suspense
          fallback={
            <div>
              <Spinner />
            </div>
          }
        >
          <RenderLgaCards />
        </Suspense>
      </MaxWidthWrapper>
    </section>
  );
};

export default LgaCards;

async function RenderLgaCards() {
  const data = await cachedLgaCards();

  if (!data || data.length === 0) {
    return <p>No LGA card record</p>;
  } else {
    return (
      <div>
        <DataTable
          columns={lgacardColumn}
          data={data}
          isSortable
          hasPages
          filterParam="lga"
        />
      </div>
    );
  }
}
