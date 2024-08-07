import { useCollection } from "../context/CollectionContext";
import { CollectionSearch } from "../components/collection/search/CollectionSearch.jsx";
import { CollectionList } from "../components/collection/list/CollectionList.jsx";
import { Layout } from "../components/layout/Layout.jsx";
import { CollectionPagination } from "../components/collection/pagination/CollectionPagination.jsx";
import { useEffect } from "react";
import { CollectionPageSkeleton } from "../components/collection/skeleton/CollectionPageSkeleton.jsx";
import { CollectionFilters } from "../components/collection/filters/CollectionFilters.jsx";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
    <Layout className="bg-gradient-to-r from-blue-900 from-25% via-black via-60% to-blue-900">
      <article className="container relative z-10 mx-auto grid grid-cols-4 gap-x-10 gap-y-5 p-4">
        <CollectionSearch collectionData={collectionData} />
        <section className="col-span-4 mx-auto">
          <CollectionFilters filtersData={filtersData} />
        </section>

        {collectionData.length && collectionData?.length > 0 ? (
          <CollectionList collectionData={collectionData} />
        ) : (
          <p className="col-span-4 text-center text-2xl text-white md:col-span-4">
            {errors ? (
              errors
            ) : (
              <>
                <span>Aún no agregaste ningún juego.</span>{" "}
                <span
                  className="cursor-pointer font-bold text-error hover:underline"
                  onClick={() => navigate("/games")}
                >
                  Comienza ahora
                </span>
              </>
            )}
          </p>
        )}

        {totalPages > 1 && <CollectionPagination totalPages={totalPages} />}
      </article>
    </Layout>
  );
};
