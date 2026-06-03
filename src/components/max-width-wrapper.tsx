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
        "mx-auto size-full px-4 md:px-6 max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
