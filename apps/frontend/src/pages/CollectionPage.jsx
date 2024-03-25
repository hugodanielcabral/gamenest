import { useEffect, useState } from "react";
import { useCollection } from "../context/CollectionContext";
import { CollectionCard } from "../components/collection/card/CollectionCard";
import { Toast } from "../components/ui";
import backgroundImage from "../assets/backgrounds/collection-wallpaper.webp";

export const CollectionPage = () => {
  const {
    collectionData,
    setCollectionData,
    getAllGamesFromUser,
    deleteGameFromCollection,
  } = useCollection();
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleOnDelete = async (collectionId) => {
    const isDeleted = await deleteGameFromCollection(collectionId);
    console.log(isDeleted);

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
    getAllGamesFromUser();
  }, []);

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
          <div>Order by:</div>
        </div>
      </div>
      <Toast toastMessage={toastMessage} showToast={toast} />

      <div className="grid grid-cols-6 gap-10 mt-2">
        <CollectionCard
          collectionData={collectionData}
          handleOnDelete={handleOnDelete}
        />
        <aside className="hidden md:col-span-2 md:block"></aside>
      </div>
    </div>
  );
};
