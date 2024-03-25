import { useEffect } from "react";
import backgroundImage from "../assets/backgrounds/collection-wallpaper.webp";
import { CollectionCard } from "../components/collection/card/CollectionCard";
import { useCollection } from "../context/CollectionContext";

export const CollectionPage = () => {
  const { collectionData, getAllGamesFromUser } = useCollection();
  //TODO 2: Reducir el tamaño de las cards debido a que habra 20 elementos por pagina.

  //TODO: Agregar paginacion usando offset y limit en el la base de datos/backend y req.query.

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

      <div className="grid grid-cols-6 gap-10 mt-2">
        <CollectionCard collectionData={collectionData} />
        <aside className="hidden md:col-span-2 md:block">FILTERS</aside>
      </div>
    </div>
  );
};
