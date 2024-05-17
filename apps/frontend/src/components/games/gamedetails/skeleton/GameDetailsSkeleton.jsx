import Skeleton from "react-loading-skeleton";

export const GameDetailsSkeleton = () => {
  return (
    <div className="min-h-screen container mx-auto mt-16">
      {/* Header */}
      <div className="flex md:flex-row flex-col items-center">
        <div className="flex-grow">
          <Skeleton height={50} width={200} count={1} />
        </div>
        <div className="flex-grow">
          <Skeleton height={50} width={200} count={1} />
        </div>
      </div>

      {/* Cover, Trailer, Add to Collection button, Brief description and Tabs */}
      <div className="grid grid-cols-8 gap-3">
        <div className="col-span-8 md:col-span-2">
          <Skeleton height={500} />
          <Skeleton height={50} />
        </div>
        <div className="col-span-8 md:col-span-6">
          <Skeleton height={500} />
          <Skeleton height={50} />
        </div>
      </div>

      {/* Screenshots, Videos, Artworks and Additional info */}
      <div className="my-2 mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
      </div>
    </div>
  );
};
