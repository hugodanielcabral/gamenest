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
    <Layout className="bg-gradient-to-bl from-indigo-700 via-blue-800 to-cyan-900">
      <article className="container relative z-10 mx-auto grid grid-cols-4 gap-x-10 gap-y-5 p-4">
        <CollectionSearch collectionData={collectionData} />
        <section className="col-span-4 mx-auto block font-bold md:hidden">
          <Button onClick={() => setModalOpen(true)}>Filtros</Button>
        </section>
        <div className="drawer z-10">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="btn btn-primary drawer-button"
            >
              Filtros
            </label>
          </div>
          <div className="drawer-side overflow-hidden">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu mt-28 min-h-full w-80 bg-base-200 p-4 text-base-content">
              {/* Sidebar content here */}
              <CollectionFilters
                filtersData={filtersData}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
              />
            </ul>
          </div>
        </div>

        {collectionData.length && collectionData?.length > 0 ? (
          <CollectionList collectionData={collectionData} />
        ) : (
          <p className="col-span-4 text-center text-2xl text-white md:col-span-3">
            {errors ? errors : "No tienes juegos en tu colección"}
          </p>
        )}

        {totalPages > 1 && <CollectionPagination totalPages={totalPages} />}
      </article>
    </Layout>
  );
};
