import { cn } from "@/lib/utils";
import { Facebook, Mail, Phone, X } from "lucide-react";

const Socials = ({ size }: { size?: string }) => {
  const defaultSize = "size-6";

  return (
    <div className="flex items-center text-white space-x-2 md:space-x-2">
      <span className="icon-bg">
        <Phone className={cn(size || defaultSize, "social")} />
      </span>

      <span className="icon-bg">
        <Facebook className={cn(size || defaultSize, "social")} />
      </span>

      <span className="icon-bg">
        <X className={cn(size || defaultSize, "social")} />
      </span>

      <span className="icon-bg">
        <Mail className={cn(size || defaultSize, "social")} />
      </span>
    </div>
  );
};

export default Socials;
