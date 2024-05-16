import Skeleton from "react-loading-skeleton";

export const GamesFinderSkeleton = () => {
  const TOTAL_SKELETON_CARDS = 10;

  return (
    <>
      {Array.from({ length: TOTAL_SKELETON_CARDS }).map((_, i) => (
        <Skeleton key={i} height={200} />
      ))}
    </>
  );
};
