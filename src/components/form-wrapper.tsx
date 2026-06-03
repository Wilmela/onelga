import { ReactNode } from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import { cn } from "@/lib/utils";

const FormWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <MaxWidthWrapper className="p-y flex-center">
      <div className={cn("w-full mx-auto max-w-4xl", className)}>
        {children}
      </div>
    </MaxWidthWrapper>
  );
};

export default FormWrapper;
