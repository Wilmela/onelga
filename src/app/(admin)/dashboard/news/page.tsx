import DashboardPagePeader from "@/components/dashboard-page-header";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Eye, Plus, ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";


const NewsPage = () => {
  const NEWS_TABS = [
    {
      icon: Plus,
      title: "Compose News",
      description:
        "Draft new articles, upload images, and publish updates to your audience instantly.",
      href: "/dashboard/news/new",
      variant: "primary" as const,
    },
    {
      icon: Eye,
      title: "Content Library",
      description:
        "Review, edit, or archive existing news posts and monitor engagement metrics.",
      href: "/dashboard/news/view",
      variant: "secondary" as const,
    },
  ];

  return (
    <section className="min-h-screen bg-slate-50/50 py-12 dark:bg-slate-950">
      <MaxWidthWrapper className="p-y">

        <DashboardPagePeader
          title="News Management"
          description="Control your narrative. Create compelling stories or manage your existing feed."
          currentPage="News"
          items={[
            { href: "/", title: "Home" },
            { href: "/dashboard", title: "Dashboard" },
          ]}
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {NEWS_TABS.map((tab) => (
            <NewsActionCard key={tab.title} {...tab} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default NewsPage;


interface NewsActionCardProps {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  variant: "primary" | "secondary";
}

const NewsActionCard = ({
  href,
  title,
  description,
  icon: Icon,
  variant,
}: NewsActionCardProps) => {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl 
        ${
          isPrimary
            ? " bg-slate-900 border-slate-800 dark:bg-white dark:border-slate-200"
            : " bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800"
        }`}
    >
      <div className="relative z-10 flex flex-col h-full justify-between gap-8">
        <div className="flex items-start justify-between">
          <div
            className={`rounded-xl p-3 shadow-sm ${isPrimary ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}
          >
            <Icon size={28} />
          </div>
          <ArrowRight
            className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${isPrimary ? "text-slate-400" : "text-slate-300"}`}
          />
        </div>

        <div>
          <h2
            className={`text-2xl font-bold tracking-tight ${isPrimary ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-white"}`}
          >
            {title}
          </h2>
          <p
            className={`mt-2 text-sm leading-relaxed ${isPrimary ? "text-slate-400 dark:text-slate-500" : "text-slate-500 dark:text-slate-400"}`}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Decorative Background Pattern */}
      <div className="absolute -right-4 -bottom-4 opacity-5 transition-opacity group-hover:opacity-10">
        <Icon size={120} strokeWidth={1} />
      </div>
    </Link>
  );
};