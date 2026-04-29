import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface DashboardCardProps {
  href: string;
  title: string;
  icon: LucideIcon;
  description: string;
  color: string;
}

export const DashboardCard = ({
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
      <h3 className="font-semibold text-slate-900 dark:text-slate-100 font-roboto">
        {title}
      </h3>
      <p className="text-sm font-heebo text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
    {/* Subtle arrow that appears on hover */}
    <span className="absolute bottom-6 right-6 opacity-0 transition-opacity group-hover:opacity-100">
      <span className="text-xl">→</span>
    </span>
  </Link>
);