import Skeleton from "react-loading-skeleton";

export const CollectionPageSkeleton = () => {
  return (
    <div className="mt-20 min-h-screen">
      <article className="container relative z-10 mx-auto grid grid-cols-4 gap-x-10 gap-y-5 p-4">
        {/* CollectionSearch */}
        <section className="col-span-4 md:col-span-4">
          <Skeleton height={50} />
        </section>

        {/* CollectionFilters */}
        <section className="col-span-4 mx-auto">
          <Skeleton height={50} width={120} />
        </section>

        {/* CollectionList */}

        <section className="col-span-4 grid h-fit grid-cols-2 gap-2 sm:grid-cols-3 md:col-span-4 md:grid-cols-5">
          <Skeleton height={300} />
          <Skeleton height={300} />
          <Skeleton height={300} />
          <Skeleton height={300} />
          <Skeleton height={300} />
          <Skeleton height={300} />
          <Skeleton height={300} />
          <Skeleton height={300} />
          <Skeleton height={300} />
          <Skeleton height={300} />
        </section>
      </article>
    </div>
  );
};
