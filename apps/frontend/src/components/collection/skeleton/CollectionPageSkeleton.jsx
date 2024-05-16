import Skeleton from "react-loading-skeleton";

export const CollectionPageSkeleton = () => {
  return (
    <div className="min-h-screen mt-20">
      <article className="relative z-10 p-4 container mx-auto grid-cols-4 grid gap-y-5 gap-x-10">
        {/* CollectionSearch */}
        <section className="col-span-4 md:col-span-3">
          <Skeleton height={50} />
        </section>

        {/* CollectionFilters Mobile */}
        <section className="col-span-4 md:hidden block mx-auto">
          <Skeleton height={50} width={120} />
        </section>

        {/* CollectionList */}

        <section className="col-span-4 md:col-span-3 grid grid-cols-1 gap-2 h-fit">
          <Skeleton height={150} />
          <Skeleton height={150} />
          <Skeleton height={150} />
          <Skeleton height={150} />
        </section>

        {/* CollectionFilters */}
        <section className="md:col-span-1 md:block hidden">
          <Skeleton height={500} />
        </section>

        {/* CollectionPagination */}
        <section className="col-span-4 mx-auto">
          <Skeleton height={50} width={120} />
        </section>
      </article>
    </div>
  );
};
