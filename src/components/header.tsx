"use client";

import {
  ChevronDown,
  Menu,
  Users,
  UserSquare2,
  UsersRoundIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAVLINKS, USER_ROLE } from "@/lib/constants";
import Logo from "./logo";
import Socials from "./socials";
import { authClient } from "@/lib/auth-client";
import { getCurrentSession } from "@/lib/actions/auth";
import { useWebHaptics } from "web-haptics/react";

const Header = () => {
  const [toggled, setToggled] = useState(false);
  const [isActive, setIsActive] = useState<string | null>(null);
  const [showNav, setShowNav] = useState(false);

  const [isPending, startTransition] = useTransition();
  const { trigger } = useWebHaptics();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  // Fix: Logic to ensure nav shows on mobile OR after 100px scroll
  function toggleNav() {
    if (typeof window !== "undefined") {
      if (window.scrollY > 100) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    }
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const session = await getCurrentSession();
        if (!session) return;
        setUser({ name: session.user.name, role: session.user.role });
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (toggled) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [toggled]);

  useEffect(() => {
    // FIX: Using setTimeout avoids the "cascading renders" error
    // const initTimeout = setTimeout(() => {
    //   toggleNav();
    // }, 0);

    window.addEventListener("scroll", toggleNav);
    // window.addEventListener("resize", toggleNav);

    return () => {
      // clearTimeout(initTimeout);
      window.removeEventListener("scroll", toggleNav);
      // window.removeEventListener("resize", toggleNav);
    };
  }, []);

  function toggleSubMenu(href: string) {
    setIsActive(isActive === href ? null : href);
  }

  function switchPath(href: string) {
    switch (href) {
      case "/leadership":
        return <Users />;
      case "/leadership/councilors":
        return <UsersRoundIcon />;
      case "/leadership/past-leaders":
        return <UserSquare2 />;
      default:
        return null;
    }
  }

  let LINKS = NAVLINKS;
  if (user && user.role === USER_ROLE.commander) {
    LINKS = [...NAVLINKS, { title: "Dashboard", href: "/dashboard" }];
  }

  const DONT_NAVIGATE_IN_MOBILE = ["/leadership", "/portals"];

  return (
    <header className="z-50">
      <MaxWidthWrapper>
        <nav
          className={cn(
            "left-0 right-0 z-50 w-full transition-all duration-300",
            showNav
              ? "animate-slide-down fixed bg-app-blue p-x"
              : "relative bg-transparent",
          )}
        >
          <Logo />

          {/* Desktop Nav */}
          <div
            className={cn(
              "hidden md:flex items-center space-x-6 bg-black/50 rounded-full py-6 px-8 h-auto",
              showNav ? "shadow-shine" : "",
            )}
          >
            {LINKS.map((l) => (
              <div key={l.title} className="relative group">
                <Link
                  href={l.href}
                  className={cn(
                    "text-white cursor-pointer hover:underline inline-flex space-x-1 relative font-semibold font-roboto",
                    pathname === l.href ? "underline" : "",
                  )}
                >
                  {l.title}
                  {l.subLinks !== undefined && (
                    <ChevronDown className="size-4 absolute bottom-0 -right-4" />
                  )}
                </Link>

                {/* Submenu - using group-hover instead of state */}
                {l.subLinks && (
                  <div
                    className="absolute top-full left-0 mt-2 bg-app-blue text-white backdrop-blur-xs border border-white rounded-md w-64 py-2 flex flex-col opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl"
                    onMouseLeave={() => setIsActive(null)}
                  >
                    {l.subLinks.map((sl) => (
                      <Link
                        href={sl.href}
                        key={sl.href}
                        onClick={() => setIsActive(null)}
                        className="hover:bg-white/20 transition-colors p-3 inline-flex items-center space-x-3 rounded-md font-heebo"
                      >
                        {switchPath(sl.href)} <span>{sl.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="inline-flex items-center space-x-4">
            {/* Socials and user*/}
            <div className="inline-flex items-center space-x-2">
              <Socials size="size-4" />

              {user && (
                <button
                  onClick={() => {
                    startTransition(async () => {
                      await trigger([
                        { duration: 30 },
                        { delay: 20, duration: 30, intensity: 0.5 },
                      ]);

                      await authClient.signOut({
                        fetchOptions: {
                          onSuccess: () => {
                            router.replace("/");
                            router.refresh();
                            setUser(null);
                          },
                          onError: (ctx) =>
                            console.log(`Error: ${ctx.error.message}`),
                        },
                      });
                    });
                  }}
                  className={cn(
                    "size-8 rounded-full flex items-center justify-center text-white font-bold font-montserrat border p-2 cursor-pointer",
                    isPending && "animate-pulse",
                    user.name !== "" && "bg-app-blue hover:bg-blue-800",
                  )}
                >
                  {user.name.charAt(0)}
                </button>
              )}
            </div>

            <button
              onClick={() => setToggled(true)}
              className="md:hidden text-white cursor-pointer hover:text-app-blue"
            >
              <Menu className="size-8" />
            </button>
          </div>

          {/* MOBILE*/}
          {toggled && (
            <div className="md:hidden flex flex-col absolute top-0 -right-4 h-svh w-[80%] bg-app-blue pl-6 pt-8 z-50">
              <X
                className="size-8 self-end mr-8 text-white mb-4"
                onClick={() => {
                  setToggled(false);
                  setIsActive(null);
                }}
              />

              {LINKS.map((l) => (
                <div
                  key={l.title}
                  className="relative animate-slide-up"
                  onClick={() => toggleSubMenu(l.href)}
                >
                  <div className="inline-flex space-x-6 relative ">
                    <Link
                      href={l.href}
                      className={cn(
                        "text-white cursor-pointer hover:underline font-semibold",
                        pathname === l.href ? "underline" : "",
                      )}
                      onClick={() => {
                        if (DONT_NAVIGATE_IN_MOBILE.includes(l.href)) return;
                        setToggled(false);
                      }}
                    >
                      <p className="text-2xl font-light mb-8 font-roboto">
                        {l.title}
                      </p>
                    </Link>

                    <span className="absolute bottom-9 -right-5">
                      {l.subLinks !== undefined && (
                        <ChevronDown className="size-4 text-white" />
                      )}
                    </span>
                  </div>

                  {/* SUB MENU */}
                  {isActive === l.href && l.subLinks && (
                    <div
                      className="absolute top-5 bg-black/20 backdrop-blur-xs p-2 rounded-md w-[80%] z-50 flex flex-col animate-slide-up"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents closing the whole menu
                        setIsActive(null);
                      }}
                    >
                      <X
                        className="self-end text-white"
                        onClick={() => setIsActive(null)}
                      />
                      <div className="flex flex-col space-y-4 text-white font-heebo">
                        {l.subLinks.map((sl) => (
                          <Link
                            href={sl.href}
                            key={sl.href}
                            onClick={() => {
                              setIsActive(null);
                              setToggled(false);
                            }}
                          >
                            {sl.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="animate-slide-up">
                <Socials size="size-4" />
              </div>
            </div>
          )}
        </nav>
      </MaxWidthWrapper>
    </header>
  );
};

export default Header;
