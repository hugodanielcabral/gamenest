import Skeleton from "react-loading-skeleton";

export const HomeAnticipatedSkeleton = () => {
  return (
    <div className="flex flex-col">
      
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div 
            key={index} 
            className="w-4/4 group relative h-[200px] overflow-hidden rounded-md sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]"
          >
            <Skeleton 
              height="100%" 
              width="100%" 
              className="rounded-md"
              baseColor="#1e293b"
              highlightColor="#374151"
            />
          </div>
        ))}
      </div>
    </div>
  );
};