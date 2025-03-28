import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const HomeLatestSkeleton = () => {
  return (
    <div className="w-full">
      <div className="group relative overflow-hidden">
        <div className="flex w-full gap-4 overflow-x-auto p-2 lg:overflow-hidden">
          {Array.from({ length: 10 }).map((_, index) => (
            <div 
              key={index} 
              className="flex-shrink-0"
            >
              <Skeleton 
                className="h-48 w-40 rounded-lg sm:h-60 sm:w-44 md:h-72 md:w-52 lg:h-80 lg:w-60" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};