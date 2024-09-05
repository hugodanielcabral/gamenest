import Skeleton from "react-loading-skeleton";

export const GameDetailsSkeleton = () => {
  return (
    <div className="min-h-screen space-y-4 p-4">
      <div className="flex gap-4 md:flex-row flex-col">
       <div className="self-center">
       <Skeleton height={352} width={280} />
       </div>
        <div className="space-y-4 self-center md:self-end">
          <Skeleton height={50} width={200} count={3}/>

        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Skeleton height={352} />
          <Skeleton height={100} />
        </div>
        <div>
          <Skeleton height={352} />
        </div>
      </div>
    </div>
  );
};
