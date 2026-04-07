import Image from "next/image";
import React from "react";

const PageBanner = ({ text }: { text?: string }) => {
  return (
    <div className="relative w-full h-100">
      <Image
        src={"/images/banner.png"}
        alt="banner"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div>{text}</div>
      <div className="absolute inset-0 bg-black/20 size-full" />
    </div>
  );
};

export default PageBanner;
