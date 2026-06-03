import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ showTitle = false }: { showTitle?: boolean }) => {
  return (
    <Link
      href={"/"}
      className="inline-flex items-center space-x-2 cursor-pointer"
    >
      <div className="relative overflow-hidden bg-white size-14 md:size-16 rounded-full">
        <Image
          src={"/images/logo.jpg"}
          alt="logo"
          fill
          sizes="64px"
          className="object-contain bg-white"
        />
      </div>
      <div className={cn(!showTitle && "hidden md:block")}>
        <h3 className="text-lg font-bold font-montserrat text-white">ONELGA</h3>
        <p className="text-white text-xs font-heebo ">Rivers State, Nigeria.</p>
      </div>
    </Link>
  );
};

export default Logo;
