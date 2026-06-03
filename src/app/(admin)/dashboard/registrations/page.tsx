import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Users, FolderKanban } from "lucide-react";
import SectionHeader from "@/components/section-header";
import { Metadata } from "next";
import { DashboardCard } from "@/components/dashboard-card";

export const metadata: Metadata = {
  title: "Admin | LGA Registrations",
};

const RegistrationPage = () => {
  const navItems = [
    {
      href: "/dashboard/registrations/birthcerts",
      title: "Birth certificates",
      icon: Users,
      description: "Manage registered birth certificates",
      color: "bg-blue-100",
    },
    {
      href: "/dashboard/registrations/lgaids",
      title: "LGA ID Card",
      icon: FolderKanban,
      description: "Manage registered LGA ID cards|",
      color: "bg-purple-500",
    },
  ];

  return (
    <section className="min-h-screen bg-slate-50/50 py-12 dark:bg-slate-950">
      <MaxWidthWrapper>
        <div className="mb-10">
          <SectionHeader
            title="Registrations Overview"
            description="
            Welcome back! Here is the gateway to all contents."
          />
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {navItems.map((item) => (
            <DashboardCard key={item.href} {...item} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default RegistrationPage;
