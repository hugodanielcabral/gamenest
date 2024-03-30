import propTypes from "prop-types";
import { createContext, useState, useContext } from "react";

export const CollectionContext = createContext();

export const useCollection = () => {
  const context = useContext(CollectionContext);

  if (!context) {
    throw new Error("useCollection must be used within an CollectionProvider");
  }

  return context;
};

export const CollectionProvider = ({ children }) => {
  const [collectionData, setCollectionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  /* const [errors, setErrors] = useState(null); */
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getAllGamesFromUser = async (queryParams) => {
    try {
      const response = await fetch(
        `${BASE_URL}/collection${queryParams ? `?${queryParams}` : ""}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      const data = await response.json();
      setCollectionData(data.fullData);
      setTotalPage(data.totalPage);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCollectionFromUser = async (collectionId) => {
    try {
      const response = await fetch(`${BASE_URL}/collection/${collectionId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      const collectionData = await response.json();
      setIsLoading(false);
      return collectionData;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGameFromCollection = async (collectionId) => {
    try {
      const response = await fetch(`${BASE_URL}/collection/${collectionId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CollectionContext.Provider
      value={{
        collectionData,
        setCollectionData,
        totalPage,
        getAllGamesFromUser,
        getCollectionFromUser,
        deleteGameFromCollection,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

CollectionProvider.propTypes = {
  children: propTypes.node.isRequired,
};
