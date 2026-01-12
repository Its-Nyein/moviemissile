import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  className?: string;
  width?: string;
  height?: string;
}

const SkeletonLoader = ({
  className,
  width = "140px",
  height = "220px",
}: SkeletonLoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Skeleton
        className={cn("rounded-lg", className)}
        style={{ width, height }}
      />
    </div>
  );
};

export default SkeletonLoader;
