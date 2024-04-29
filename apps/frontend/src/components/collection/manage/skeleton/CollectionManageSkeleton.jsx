import Skeleton from "react-loading-skeleton";

export const CollectionManageSkeleton = () => {
  return (
    <div className="min-h-screen">
      <article className="relative z-10 p-4 container mx-auto grid-cols-4 grid gap-5">
        <section className="col-span-4">
          <header className="p-4 flex justify-around items-center md:flex-row flex-col">
            <div className="flex flex-col gap-y-3">
              <article className="order-last md:order-first">
                <Skeleton height={350} width={260} />
              </article>
              <Skeleton height={50} width={260} />
            </div>
            <div className="flex flex-col gap-y-5 mt-5">
              <article>
                <Skeleton height={60} width={300} />
                <Skeleton height={30} width={300} />
              </article>
            </div>
          </header>
        </section>
        <section className="col-span-4">
          <Skeleton height={400} />
        </section>
        <section className="col-span-4">
          <Skeleton height={400} />
        </section>
        <section className="col-span-4 flex gap-5">
          <Skeleton width={200} height={50} />
          <Skeleton width={150} height={50} />
        </section>
      </article>
    </div>
  );
};
