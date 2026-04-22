import MaxWidthWrapper from "@/components/max-width-wrapper";

// import { cn } from "@/lib/utils";
// import { Baby, User2 } from "lucide-react";
// import Link from "next/link";

// const actions = [
//   {
//     type: "Birth",
//     title: "Register for birth certifcates",
//     description: "This is the channel for birth certificates registrations",
//     icon: Baby,
//     bg: "bg-blue-500",
//     href: "/",
//   },
//   {
//     type: "LgaID",
//     title: "Register for LGA ID",
//     description: "This is the channel for local government ID registrations",
//     icon: User2,
//     bg: "bg-green-500",
//     href: "/",
//   },
// ];

const ApplicationsPage = () => {
  return (
    <section>
      {/* <PageBanner /> */}
      <div className="p-y relative w-full h-100 md:h-110 flex flex-col items-center justify-center space-y-8 border-b bg-linear-to-tr from-app-blue/70 to-app-green/40">
        <h1 className="font-bold font-montserrat text-5xl md:text-9xl text-center bg-linear-to-t to-app-blue from-black  bg-clip-text text-transparent">
          Application
        </h1>

        <p className="font-roboto text-lg text-white">
          This is the platform for all kinds of application.
        </p>
      </div>

      <MaxWidthWrapper className="p-y flex items-center justify-center">
        {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          {actions.map((a) => (
            <Link
              href={a.href}
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
        </div> */}
        <h1>No opennings yet</h1>
      </MaxWidthWrapper>
    </section>
  );
};

export default ApplicationsPage;
