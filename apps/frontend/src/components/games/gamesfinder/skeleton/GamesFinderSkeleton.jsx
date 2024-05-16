import Skeleton from "react-loading-skeleton";

export const GamesFinderSkeleton = () => {
  const TOTAL_SKELETON_CARDS = 10;

  return (
    <div className="min-h-screen mt-20">
      <article className="relative z-10 p-4 container mx-auto grid-cols-4 grid gap-y-5 gap-x-10">
        {/* GamesSearch */}
        <section className="col-span-4 md:col-span-3">
          <Skeleton height={50} />
        </section>

        {/* GamesFilters Mobile */}
        <section className="col-span-4 md:hidden block mx-auto">
          <Skeleton height={50} width={120} />
        </section>

        {/* GamesCard */}

        <section className="col-span-4 md:col-span-3 grid grid-cols-1 gap-2 h-fit">
          {[...Array(TOTAL_SKELETON_CARDS)].map((_, index) => (
            <Skeleton key={index} height={150} />
          ))}
        </section>

        {/* GamesFilters */}
        <section className="md:col-span-1 md:block hidden">
          <Skeleton height={500} />
        </section>

        {/* GamesPagination */}
        <section className="col-span-4 mx-auto">
          <Skeleton height={50} width={120} />
        </section>
      </article>
    </div>
  );
};
