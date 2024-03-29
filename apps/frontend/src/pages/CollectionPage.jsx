import { useEffect, useState } from "react";
import { useCollection } from "../context/CollectionContext";
import { CollectionCard } from "../components/collection/card/CollectionCard";
import { Toast } from "../components/ui";
import { useQuery } from "../hooks/useQuery";
import { CollectionPagination } from "../components/collection/pagination/CollectionPagination";
import { CollectionFilters } from "../components/collection/filters/CollectionFilters";
import usePagination from "../hooks/usePagination";
import backgroundImage from "../assets/backgrounds/collection-wallpaper.webp";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";

export const CollectionPage = () => {
  const {
    collectionData,
    setCollectionData,
    totalPage: totalPageContext,
    getAllGamesFromUser,
    deleteGameFromCollection,
  } = useCollection();

  const { handlePage, currentPage, totalPage } =
    usePagination(totalPageContext);

  const [orderBy, setOrderBy] = useState("");
  const [statusQuery, setStatusQuery] = useState("");
  const { paramsString, searchParams, setSearchParams } = useQuery();

  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  //? Maybe i can move this to a custom hook to avoid repeating code? 🤔
  //? i should make this more "generic" to be able to use it in other pages as well.
  const handleOrderBy = ({ target }) => {
    setOrderBy(target.value);
    searchParams.set("orderby", target.value);
    setSearchParams(searchParams);
  };
  const handleSort = ({ target }) => {
    setOrderBy(target.value);
    searchParams.set("sort", target.value);
    setSearchParams(searchParams);
  };

  const handleStatus = ({ target }) => {
    let statusValues = searchParams.get("status")
      ? searchParams.get("status").split(", ")
      : [];

    if (target.checked) {
      statusValues.push(target.value);
    } else {
      statusValues = statusValues.filter((value) => value !== target.value);
    }

    searchParams.set("status", statusValues.join(", "));
    setStatusQuery(statusValues.join(", "));
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

  console.log(statusQuery);
  useEffect(() => {
    getAllGamesFromUser(paramsString);
  }, [orderBy, currentPage, statusQuery]);

  return (
    <div
      className="p-4 min-h-[100vh] bg-no-repeat bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 90%), url(${backgroundImage})`,
      }}
    >
      <div className="flex p-5 mt-5 bg-base-100/90 justify-evenly bg-opacity-90 min-w-[300px] max-w-[900px] mx-auto shadow-sm shadow-black">
        <div className="grid grid-cols-2 items-center gap-3 w-full justify-around">
          <div className="flex gap-5 items-center col-span-1">
            <p className="font-bold">View:</p>
            <CiGrid2H size={25} className="text-details-500" />
            <CiGrid41 size={25} className="text-details-500" />
          </div>

          <div className="flex gap-3 col-span-1 items-center">
            <p className="font-bold">Order by:</p>
            <select
              className="select select-bordered w-full max-w-xs"
              onChange={handleOrderBy}
            >
              <option disabled selected>
                Select an option
              </option>
              <option value="status">Status</option>
              <option value="platform">Platform</option>
              <option value="ownership">Ownership</option>
              <option value="collection_id">Date added</option>
            </select>

            <p className="font-bold">Sort:</p>

            <select
              className="select select-bordered w-full max-w-xs"
              onChange={handleSort}
            >
              <option disabled selected>
                Select an option
              </option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
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
        <CollectionFilters
          handleStatus={handleStatus}
          setStatusQuery={setStatusQuery}
        />
        <CollectionPagination
          handlePage={handlePage}
          currentPage={currentPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};
