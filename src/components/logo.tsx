import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href={"/"}
      className="inline-flex items-center space-x-2 cursor-pointer"
    >
      <div className="relative overflow-hidden bg-white size-14 md:size-16 rounded-full">
        <Image
          src={"/images/logo.png"}
          alt="logo"
          fill
          sizes="64px"
          className="object-contain"
        />
      </div>
      <div className="hidden md:block">
        <h3 className="text-lg font-bold font-montserrat text-white">ONELGA</h3>
        <p className="text-white text-xs font-heebo ">Rivers State, Nigeria.</p>
      </div>
    </Link>
  );
};

export default Logo;
