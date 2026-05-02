import MaxWidthWrapper from "@/components/max-width-wrapper";

import { cn } from "@/lib/utils";
import { Baby, User2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Registrations",
};

const actions = [
  {
    type: "birth",
    title: "Register for birth certifcates",
    description: "This is the channel for birth certificates registrations",
    icon: Baby,
    bg: "bg-blue-500",
    href: "/registrations",
  },
  {
    type: "lgaId",
    title: "Register for LGA ID",
    description: "This is the channel for local government ID registrations",
    icon: User2,
    bg: "bg-green-500",
    href: `registrations`,
  },
];

const RegistrationPage = () => {
  return (
    <section>
      {/* <PageBanner /> */}
      <div className="bg-app-blue relative">
        
        <div className="size-75 blur-2xl bg-blue-100/10 rounded-full absolute top-20 right-10 " />

        <div className="size-100 blur-[50px] bg-blue-100/10 rounded-full absolute top-0 left-10 " />

        <MaxWidthWrapper className="p-y relative w-full h-100 md:h-110 flex flex-col items-center justify-center space-y-8 border-b ">
          <h1 className="font-bold font-montserrat text-5xl md:text-9xl text-center text-white z-20">
            Registrations
          </h1>

          <p className="font-roboto md:text-lg text-white">
            This is the platform for all kinds of registrations.
          </p>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper className="p-y">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          {actions.map((a) => (
            <Link
              href={`${a.href}/${a.type}`}
              key={a.type}
              className={cn(
                "border rounded-md space-y-4 p-4",
                "hover:scale-105 hover:translate-y-1 cursor-pointer transition-transform ease-in shadow-sm",
              )}
            >
              <div
                className={cn(
                  "inline-flex items-center justify-center rounded-md size-12",
                  `${a.bg}`,
                )}
              >
                <a.icon size={30} className="text-white" />
              </div>
              <div className="space-y-4">
                <h2 className="font-roboto font-semibold text-xl text-app-dark-green">
                  {a.title}
                </h2>
                <p className="p-text text-sm leading-relaxed">
                  {a.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default RegistrationPage;
