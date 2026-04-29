import DashboardPagePeader from "@/components/dashboard-page-header";
import { DataTable } from "@/components/data-table";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Spinner from "@/components/spinner";
import { birthCertColumn } from "@/features/registrations/birth-certs/components/birth-cert-columns";
import { cachedBirthcerts } from "@/lib/DAL/cache";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin | Birthcert",
};
const Birthcerts = () => {
  return (
    <section>
      <MaxWidthWrapper className="p-y">
        <DashboardPagePeader
          title="Birth Certificate Management"
          description="Manage all register birth certificates."
          currentPage="Birth certs"
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
          <RenderBirthCerts />
        </Suspense>
      </MaxWidthWrapper>
    </section>
  );
};

export default Birthcerts;

async function RenderBirthCerts() {
  const data = await cachedBirthcerts();

  if (!data || data.length === 0) {
    return <p>No birth cert record</p>;
  } else {
    return (
      <div>
        <DataTable
          columns={birthCertColumn}
          data={data}
          isSortable
          hasPages
          filterParam="certId"
        />
      </div>
    );
  }
}
