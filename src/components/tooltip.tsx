import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideProps } from "lucide-react";
import {
  ForwardRefExoticComponent,
  JSX,
  PropsWithChildren,
  RefAttributes,
} from "react";

interface Props extends PropsWithChildren {
  title: string;
  className: string;
  Icon:
    | ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | any;
  showIcon?: boolean;
}
export function CusTooltip({ children, title, Icon, className }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Icon className={className} />
      </TooltipTrigger>
      <TooltipContent className="space-y-2 flex flex-col items-center justify-center">
        <p>{title}</p>
        <div>{children}</div>
      </TooltipContent>
    </Tooltip>
  );
}
