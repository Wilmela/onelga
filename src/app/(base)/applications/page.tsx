import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { ArrowRight, House } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const ApplicationsPage = async () => {
  return (
    <section>
      <div className="bg-app-blue">
        <div className="size-75 blur-2xl bg-blue-100/10 rounded-full absolute top-20 right-10 " />

        <div className="size-100 blur-[50px] bg-blue-100/10 rounded-full absolute top-0 left-10 " />
        <MaxWidthWrapper className="p-y relative w-full h-100 md:h-110 flex flex-col items-center justify-center space-y-8 border-b ">
          <h1 className="font-bold font-montserrat text-5xl md:text-7xl lg:text-8xl text-center text-white">
            Applications
          </h1>

          <p className="font-roboto md:text-lg text-white">
            This is the platform for all kinds of application.
          </p>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper className="p-y flex items-center justify-center">
        <Suspense fallback={<p>Loading...</p>}>
          <RenderApplications />
        </Suspense>
      </MaxWidthWrapper>
    </section>
  );
};

export default ApplicationsPage;

const actions = [
  {
    postion: "Architect",
    description: "Handle all archectural task in the secratariat",
    icon: House,
    bg: "bg-blue-500",
    href: "/applications/apply",
  },
];

async function RenderApplications() {
  // const actions = await cachedJobAplications();


  return (
    <div>
      <>
        {actions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
            {actions.map((a) => (
              <Link
                href={`${a.href}?position=${a.postion}&description=${a.description.trim().slice(0, 7)}`}
                key={a.postion}
                className={cn(
                  "border rounded-md space-y-4 p-4",
                  "hover:scale-105 hover:translate-y-1 cursor-pointer transition-transform ease-in shadow-sm relative",
                )}
              >
                <div className="flex justify-between items-center">
                  <div
                    className={cn(
                      "inline-flex items-center justify-center rounded-md size-12 ",
                      `${a.bg}`,
                    )}
                  >
                    <a.icon size={30} className="text-white" />
                  </div>

                  <Badge
                    className={`absolute top-8 right-4 font-heebo text-xs ${a.bg}`}
                  >
                    {" "}
                    Apply <ArrowRight />
                  </Badge>
                </div>
                <div className="space-y-4">
                  <h2 className="font-roboto font-semibold text-xl text-app-dark-green">
                    {a.postion}
                  </h2>
                  <p className="p-text text-sm leading-relaxed">
                    {a.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <h1>No opennings yet</h1>
        )}
      </>
    </div>
  );
}
