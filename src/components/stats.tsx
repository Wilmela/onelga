import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import { LucideProps } from "lucide-react";
import { stats } from "@/lib/constants";

const Stats = () => {
  return (
    <section className="bg-app-blue/5">
      <MaxWidthWrapper className="p-y" id="stat">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stats.map((s) => {
            return (
              <SingleStat
                key={s.title}
                Icon={s.Icon}
                title={s.title}
                description={s.description}
                value={s.value}
              />
            );
          })}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Stats;

type Props = {
  value: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
};

function SingleStat({ value, Icon, title, description }: Props) {
  return (
    <div className="space-y-2 flex flex-col items-center py-6 rounded-2xl transition-all duration-300 ease-in group ">
      <div className="flex items-center justify-center size-10 rounded-full bg-app-blue/10 group-hover:bg-app-blue ">
        <Icon className="size-4 group-hover:text-white" />
      </div>
      <h2 className="font-bold text-lg transition-all duration-300  ease-in group-hover:scale-105 group-hover:text-app-dark-green">
        {value}
      </h2>
      <p className="p-text group-hover:text-app-blue">{title}</p>
      <p className="text-xs font-light group-hover:text-app-blue">
        {description}
      </p>
    </div>
  );
}
