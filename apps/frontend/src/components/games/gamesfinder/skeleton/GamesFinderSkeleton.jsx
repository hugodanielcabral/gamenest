import Skeleton from "react-loading-skeleton";

export const GamesFinderSkeleton = () => {
  const TOTAL_SKELETON_CARDS = 10;

  return (
    <div className="col-span-4 flex flex-col gap-y-4 md:col-span-4">
      <Skeleton height={50} />
      <div className="self-center">
        <Skeleton height={50} width={300} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: TOTAL_SKELETON_CARDS }).map((_, i) => (
          <Skeleton key={i} height={200} />
        ))}
      </div>
    </div>
  );
};
