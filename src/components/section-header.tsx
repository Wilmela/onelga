import { cn } from "@/lib/utils";

const SectionHeader = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "py-2 mb-6 md:mb-8 lg:mb-12 w-full flex flex-col space-y-2",
        className,
      )}
    >
      <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
      <p className="p-text text-lg max-w-[50ch]">{description}</p>
      <div className="w-30 h-1 bg-app-blue rounded-full" />
    </div>
  );
};

export default SectionHeader;
