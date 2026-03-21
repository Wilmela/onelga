import DashboardPagePeader from "@/components/dashboard-page-header";
import { DataTable } from "@/components/data-table";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Spinner from "@/components/spinner";
import { usersColumn } from "@/components/users-columns";
import { cachedUsers } from "@/lib/DAL/cache";
import { Suspense } from "react";

const UsersPage = () => {
  return (
    <section>
      <MaxWidthWrapper className="p-y">
        <DashboardPagePeader
          title="System Users"
          description="Manage all register users."
          currentPage="Users"
          items={[
            { href: "/", title: "Home" },
            { href: "/dashboard", title: "Dashboard" },
          ]}
        />
        <Suspense
          fallback={
            <div>
              <Spinner />
            </div>
          }
        >
          <FetchUsers />
        </Suspense>
      </MaxWidthWrapper>
    </section>
  );
};

export default UsersPage;

async function FetchUsers() {
  const data = await cachedUsers();

  if (!data || data.usersLength === 0) {
    return <p>No subscribed user available</p>;
  } else {
    return (
      <div>
        <DataTable
          columns={usersColumn}
          data={data}
          isSortable
          hasPages
          filterParam="name"
        />
      </div>
    );
  }
}
