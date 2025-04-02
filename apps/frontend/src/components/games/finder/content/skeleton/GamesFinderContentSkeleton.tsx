import Skeleton from "react-loading-skeleton";

export const GamesFinderContentSkeleton = () => {
  return (
    <div className="col-span-3 grid h-fit grid-cols-1 gap-4 xl:grid-cols-2">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="h-32 rounded-lg bg-gray-800/50 sm:h-36 md:h-40 lg:h-44"
        >
          <Skeleton height="100%" containerClassName="w-full" />
        </div>
      ))}
    </div>
  );
};
