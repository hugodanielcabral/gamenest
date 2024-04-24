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
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [collectionData, setCollectionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
