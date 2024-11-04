import { Skeleton } from "@/components/ui/skeleton";
import PropType from "prop-types";
export function SkeletonCard({
  containerClassName = "",
  skeletonClassName = "h-[70vh] w-[70vw] rounded-xl",
  titleSkeletonClassName = "h-4 w-[250px]",
  subtitleSkeletonClassName = "h-4 w-[200px]",
}) {
  return (
    <div className={`flex flex-col space-y-3 ${containerClassName}`}>
      <Skeleton className={skeletonClassName} />
      <div className="space-y-2">
        <Skeleton className={titleSkeletonClassName} />
        <Skeleton className={subtitleSkeletonClassName} />
      </div>
    </div>
  );
}

SkeletonCard.propTypes = {
  containerClassName: PropType.string,
  skeletonClassName: PropType.string,
  titleSkeletonClassName: PropType.string,
  subtitleSkeletonClassName: PropType.string,
};
