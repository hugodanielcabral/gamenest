import Skeleton from "react-loading-skeleton";

export const CollectionGamePageSkeleton = () => {
  return (
    <div className="container mx-auto min-h-screen mt-20">
      <div className="flex flex-col items-center md:items-end gap-x-4 md:flex-row justify-center ">
        <div className="flex flex-col gap-y-2">
          <Skeleton width={264} height={352} />
          <Skeleton width={264} height={50} />
          <Skeleton width={264} height={50} />
          <Skeleton width={264} height={50} />
        </div>
        <div className="w-72 flex-grow md:w-0">
          <Skeleton count={2} height={50} className="mt-5" />
          <Skeleton height={200} />
        </div>
      </div>
    </div>
  );
};
