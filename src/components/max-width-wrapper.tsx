import { cn } from "@/lib/utils";
import React, { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  children: ReactNode;
  id?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}
const MaxWidthWrapper = ({ children, className, id, ref }: Props) => {
  return (
    <div
      ref={ref}
      id={id}
      className={cn(
        "mx-auto size-full px-4 sm:px-6 md:px-8 lg:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
