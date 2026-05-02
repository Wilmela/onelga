import MaxWidthWrapper from "@/components/max-width-wrapper";
import { PenBox, EyeIcon } from "lucide-react";
import SectionHeader from "@/components/section-header";
import { Metadata } from "next";
import { DashboardCard } from "@/components/dashboard-card";

export const metadata: Metadata = {
  title: "Admin",
};

const ApplicationDashboardPage = () => {
  const navItems = [
    {
      href: "/dashboard/applications/create",
      title: "Create Application",
      icon: PenBox,
      description: "Create New Application",
      color: "bg-blue-100",
    },
    {
      href: "/dashboard/applications/view",
      title: "View Applications",
      icon: EyeIcon,
      description: "View And Manage All Applications",
      color: "bg-purple-500",
    },
  ];

  return (
    <section className="min-h-screen bg-slate-50/50 py-12 dark:bg-slate-950">
      <MaxWidthWrapper>
        <div className="mb-10">
          <SectionHeader
            title="Dashboard Overview"
            description="
            Welcome back! Here is the gateway to all contents."
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {navItems.map((item) => (
            <DashboardCard key={item.href} {...item} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default ApplicationDashboardPage;
