import { useEffect, useState } from "react";
import { useCollection } from "../context/CollectionContext";
import { CollectionCard } from "../components/collection/card/CollectionCard";
import { Toast } from "../components/ui";
import backgroundImage from "../assets/backgrounds/collection-wallpaper.webp";
import { useQuery } from "../hooks/useQuery";
import { CollectionPagination } from "../components/collection/pagination/CollectionPagination";
import { CollectionFilters } from "../components/collection/filters/CollectionFilters";
import usePagination from "../hooks/usePagination";

export const CollectionPage = () => {
  const {
    collectionData,
    setCollectionData,
    totalPage: totalPageContext,
    getAllGamesFromUser,
    deleteGameFromCollection,
    setIsLoading,
  } = useCollection();

  const { handlePage, currentPage, totalPage } =
    usePagination(totalPageContext);

  const [orderBy, setOrderBy] = useState("");
  const { paramsString, searchParams, setSearchParams } = useQuery();
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  //? Maybe i can move this to a custom hook to avoid repeating code? 🤔
  //? i should make this more "generic" to be able to use it in other pages as well.
  const handleOrderBy = ({ target }) => {
    setOrderBy(target.value);
    searchParams.set("order", target.value);
    setSearchParams(searchParams);
  };

  const handleOnDelete = async (collectionId) => {
    const isDeleted = await deleteGameFromCollection(collectionId);

    if (isDeleted.status === 204) {
      const newCollectionData = collectionData.filter(
        (collection) => collection.collection_id !== collectionId
      );
      const { name } = collectionData.find(
        (collection) => collection.collection_id === collectionId
      );
      setCollectionData(newCollectionData);
      setToast(true);
      setToastMessage(name + " has been deleted from your collection");

      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  };

  useEffect(() => {
    getAllGamesFromUser(paramsString);

    return () => {
      setIsLoading(true);
    };
  }, [orderBy, currentPage]);

  return (
    <div
      className="p-4 min-h-[100vh] bg-no-repeat bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 90%), url(${backgroundImage})`,
      }}
    >
      <div className="flex p-5 mt-5 bg-base-100/90 justify-evenly bg-opacity-90 min-w-[300px] max-w-[900px] mx-auto shadow-sm shadow-black">
        <div className="flex items-center gap-3 w-full justify-around">
          <div>View:</div>
          <div className="flex gap-5">
            <p>Order by:</p>
            <select
              className="select select-bordered w-full max-w-xs"
              onChange={handleOrderBy}
            >
              <option disabled selected>
                Select an option
              </option>
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>
        </div>
      </div>
      <Toast toastMessage={toastMessage} showToast={toast} />

      <div className="grid grid-cols-6 gap-10 mt-2">
        <CollectionCard
          collectionData={collectionData}
          handleOnDelete={handleOnDelete}
        />
        <CollectionFilters />
        <CollectionPagination
          handlePage={handlePage}
          currentPage={currentPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};
