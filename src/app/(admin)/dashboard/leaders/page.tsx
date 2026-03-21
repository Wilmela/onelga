import MaxWidthWrapper from "@/components/max-width-wrapper";
import Link from "next/link";
import {
  ChevronRight,
  Briefcase,
  Users2,
  History,
  LucideIcon,
} from "lucide-react";
import DashboardPagePeader from "@/components/dashboard-page-header";

const leaderCategories = [
  {
    href: "/dashboard/leaders/executives",
    title: "Executives",
    subtitle: "Current board members and decision makers",
    icon: Briefcase,
  },
  {
    href: "/dashboard/leaders/councilors",
    title: "Councilors",
    subtitle: "Elected representatives and advisory staff",
    icon: Users2,
  },
  {
    href: "/dashboard/leaders/past-leaders",
    title: "Past Leaders",
    subtitle: "Archive of historical leadership and legacy",
    icon: History,
  },
];
const LeadersPage = () => {
  return (
    <section className="min-h-screen bg-slate-50/50 py-12 dark:bg-slate-950">
      <MaxWidthWrapper>
        <DashboardPagePeader
          title="Leadership"
          description=" Select a category to view detailed profiles and governance history."
          currentPage="Leaders"
          items={[
            { href: "/", title: "Home" },
            { href: "/dashboard", title: "Dashboard" },
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaderCategories.map((item) => (
            <LeaderLink key={item.href} {...item} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default LeadersPage;

interface LeaderLinkProps {
  href: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

const LeaderLink = ({ href, title, subtitle, icon: Icon }: LeaderLinkProps) => (
  <Link
    href={href}
    className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-500 hover:bg-blue-50/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-400 dark:hover:bg-blue-900/10"
  >
    <div className="flex items-center gap-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-blue-900/30">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>
    </div>
    <ChevronRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-500" />
  </Link>
);
