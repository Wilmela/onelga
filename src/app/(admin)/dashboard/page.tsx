import MaxWidthWrapper from "@/components/max-width-wrapper";
import {
  Users,
  FolderKanban,
  ShieldCheck,
  Newspaper,
  Megaphone,
  Book,
  Pen,
} from "lucide-react";
import SectionHeader from "@/components/section-header";
import { Metadata } from "next";
import { DashboardCard } from "@/components/dashboard-card";

export const metadata: Metadata = {
  title: "Admin",
};

const DashboardPage = () => {
  const navItems = [
    {
      href: "/dashboard/users",
      title: "Users",
      icon: Users,
      description: "Manage team members and permissions",
      color: "bg-blue-100",
    },
    {
      href: "/dashboard/projects",
      title: "Projects",
      icon: FolderKanban,
      description: "Track active tasks and milestones",
      color: "bg-purple-500",
    },
    {
      href: "/dashboard/leaders",
      title: "Leaders",
      icon: ShieldCheck,
      description: "View executive insights and roles",
      color: "bg-emerald-500",
    },
    {
      href: "/dashboard/news",
      title: "News",
      icon: Newspaper,
      description: "Latest LGA updates and posts",
      color: "bg-orange-500",
    },
    {
      href: "/dashboard/announcements",
      title: "Announcements",
      icon: Megaphone,
      description: "Latest public announcements",
      color: "bg-yellow-500",
    },
    {
      href: "/dashboard/registrations",
      title: "Registrations",
      icon: Book,
      description: "All LGA registrations",
      color: "bg-indigo-500",
    },
    {
      href: "/dashboard/applications",
      title: "Applications",
      icon: Pen,
      description: "Manage applications",
      color: "bg-blue-400",
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

        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {navItems.map((item) => (
            <DashboardCard key={item.href} {...item} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default DashboardPage;
