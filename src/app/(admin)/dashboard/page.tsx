import MaxWidthWrapper from "@/components/max-width-wrapper";
import Link from "next/link";
import {
  Users,
  FolderKanban,
  ShieldCheck,
  Newspaper,
  LucideIcon,
} from "lucide-react";

// 1. Define the reusable Card Component
interface DashboardCardProps {
  href: string;
  title: string;
  icon: LucideIcon;
  description: string;
  color: string;
}

const DashboardCard = ({
  href,
  title,
  icon: Icon,
  description,
  color,
}: DashboardCardProps) => (
  <Link
    href={href}
    className="group relative flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
  >
    <div
      className={`w-fit rounded-lg p-3 ${color} bg-opacity-10 dark:bg-opacity-20`}
    >
      <Icon className={`h-6 w-6 ${color.replace("bg-", "text-")}`} />
    </div>
    <div>
      <h3 className="font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
    {/* Subtle arrow that appears on hover */}
    <span className="absolute bottom-6 right-6 opacity-0 transition-opacity group-hover:opacity-100">
      <span className="text-xl">→</span>
    </span>
  </Link>
);

const DashboardPage = () => {
  const navItems = [
    {
      href: "/dashboard/users",
      title: "Users",
      icon: Users,
      description: "Manage team members and permissions",
      color: "bg-blue-500",
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
      description: "Latest company updates and posts",
      color: "bg-orange-500",
    },
  ];

  return (
    <section className="min-h-screen bg-slate-50/50 py-12 dark:bg-slate-950">
      <MaxWidthWrapper>
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-slate-500">
            Welcome back! Here is what&apos;s happening today.
          </p>
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
