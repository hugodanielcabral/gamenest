import { useEffect, useState } from "react";
import backgroundImage from "../assets/backgrounds/collection-wallpaper.webp";
import { CollectionCard } from "../components/collection/card/CollectionCard";
import { useAuth } from "../context/AuthContext";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const CollectionPage = () => {
  const { user } = useAuth();
  const [collectionData, setCollectionData] = useState([]);

  const getAllGamesFromUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/collection/1`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      const data = await response.json();
      setCollectionData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGamesFromUser();
  }, []);
  return (
    <div
      className="p-4 min-h-[100vh] bg-no-repeat bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 80%), url(${backgroundImage})`,
      }}
    >
      <div className="flex p-5 mt-5 bg-base-100 justify-evenly bg-opacity-70 min-w-[300px] max-w-[900px] mx-auto shadow-2xl shadow-black">
        <div className="flex items-center gap-3 w-full justify-around">
          <div>View:</div>
          <div>Order by:</div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-10 mt-10">
        <CollectionCard collectionData={collectionData} />
        <aside className="hidden md:col-span-2 md:block">FILTERS</aside>
      </div>
    </div>
  );
};
