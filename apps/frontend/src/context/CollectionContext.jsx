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
  const [errors, setErrors] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getAllGamesFromUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/collection`, {
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
        getAllGamesFromUser,
        getCollectionFromUser,
        deleteGameFromCollection,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

CollectionProvider.propTypes = {
  children: propTypes.node.isRequired,
};
