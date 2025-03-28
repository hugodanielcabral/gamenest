import Skeleton from "react-loading-skeleton";
import { Icon } from "../../../ui/icon/Icon";

export const HomePopularSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-4">
        <h2 className="col-span-full my-4 text-center font-nunito text-xl text-white md:text-3xl lg:text-4xl">
          <Icon name="icon-[noto-v1--fire]" />
          Los más populares ahora mismo
          <Icon name="icon-[noto-v1--fire]" />
        </h2>{" "}
      </div>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="h-32 rounded-lg bg-gray-800/50 sm:h-36 md:h-40 lg:h-44"
          >
            <Skeleton height="100%" containerClassName="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
