import Skeleton from "react-loading-skeleton";

export const GameDetailsSkeleton = () => {
  return (
    <div className="container mx-auto mt-16 min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center">
        <div className="flex-grow">
          <Skeleton height={50} count={2} />
        </div>
      </div>

      {/* Cover, Trailer, Add to Collection button, Brief description and Tabs */}
      <div className="grid grid-cols-8 gap-3">
        <div className="col-span-8 lg:col-span-2">
          <Skeleton height={500} />
          <Skeleton height={50} />
        </div>
        <div className="col-span-8 lg:col-span-4">
          <Skeleton height={500} />
          <Skeleton height={50} />
        </div>

        <div className="col-span-8 lg:col-span-2">
          <Skeleton height={550} />
        </div>
      </div>
    </div>
  );
};
