import collectionBackground from "../assets/backgrounds/collection-background.webp";
import { useCollection } from "../context/CollectionContext";
import { Button } from "../components/ui/index.js";
import { CollectionSearch } from "../components/collection/search/CollectionSearch.jsx";
import { CollectionList } from "../components/collection/list/CollectionList.jsx";
import { Layout } from "../components/layout/Layout.jsx";
import { CollectionPagination } from "../components/collection/pagination/CollectionPagination.jsx";
import { useEffect, useState } from "react";
import { CollectionFilters } from "../components/collection/filters/CollectionFilters.jsx";
import { CollectionPageSkeleton } from "../components/collection/skeleton/CollectionPageSkeleton.jsx";

export const CollectionPage = () => {
  const {
    collectionData,
    isLoading,
    errors,
    totalPages,
    getCollection,
    getTotalCollectionPages,
    search,
    getCollectionFilters,
    filtersData,
  } = useCollection();

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getCollection();
    getTotalCollectionPages();
  }, [search, collectionData.length]);
  //? I need to add collectionData.length to the dependency array to avoid an infinite loop. I'm using collectionData.length because I need to update the collectionData when a game is deleted from the collection

  useEffect(() => {
    getCollectionFilters();
  }, []);

  return isLoading ? (
    <CollectionPageSkeleton />
  ) : (
    <Layout>
      <img
        src={collectionBackground}
        className="w-full absolute left-0 right-0 gradient-mask-b-[rgb(0,0,0,1),rgb(0,0,0,0.4)_40%,rgb(0,0,0,0)]"
      />
      <article className="relative z-10 p-4 container mx-auto grid-cols-4 grid gap-y-5 gap-x-10">
        <CollectionSearch collectionData={collectionData} />
        <section className="md:hidden block col-span-4 mx-auto font-bold">
          <Button onClick={() => setModalOpen(true)}>Filtros</Button>
        </section>

        {collectionData.length && collectionData?.length > 0 ? (
          <CollectionList collectionData={collectionData} />
        ) : (
          <p className="col-span-4 md:col-span-3 text-center text-white text-2xl">
            {errors ? errors : "No tienes juegos en tu colección"}
          </p>
        )}

        <section className="md:col-span-1">
          <CollectionFilters
            filtersData={filtersData}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
        </section>

        <CollectionPagination totalPages={totalPages} />
      </article>
    </Layout>
  );
};
