import collectionBackground from "../assets/backgrounds/collection-background.webp";
import { useCollection } from "../context/CollectionContext";
import { Loading } from "../components/ui/index.js";
import { CollectionSearch } from "../components/collection/search/CollectionSearch.jsx";
import { CollectionList } from "../components/collection/list/CollectionList.jsx";
import { Layout } from "../components/layout/Layout.jsx";
import { CollectionPagination } from "../components/collection/pagination/CollectionPagination.jsx";
import { useEffect } from "react";

export const CollectionPage = () => {
  const {
    collectionData,
    isLoading,
    errors,
    totalPages,
    getCollection,
    getTotalCollectionPages,
    search,
  } = useCollection();

  useEffect(() => {
    getCollection();
    getTotalCollectionPages();
  }, [search]);

  return isLoading ? (
    <Loading />
  ) : (
    <Layout>
      <img
        src={collectionBackground}
        className="w-full absolute left-0 right-0 gradient-mask-b-[rgb(0,0,0,1),rgb(0,0,0,0.4)_40%,rgb(0,0,0,0)]"
      />
      <article className="relative z-10 p-4 container mx-auto grid-cols-4 grid gap-y-5 gap-x-10">
        <CollectionSearch collectionData={collectionData} />

        {collectionData?.length > 0 ? (
          <CollectionList collectionData={collectionData} />
        ) : (
          <p className="col-span-4 md:col-span-3 text-center text-white text-2xl">
            {errors ? errors : "No games found in your collection"}
          </p>
        )}

        <section className="hidden md:block p-4 md:col-span-1 h-[350px]">
          <aside>
            <article className="bg-black p-4 h-[100px] border-4 border-white"></article>
            <article className="bg-black p-4 h-[100px] border-4 border-white"></article>
            <article className="bg-black p-4 h-[100px] border-4 border-white"></article>
          </aside>
        </section>

        <CollectionPagination totalPages={totalPages} />
      </article>
    </Layout>
  );
};
