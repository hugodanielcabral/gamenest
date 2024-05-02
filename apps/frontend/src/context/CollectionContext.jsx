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
  const [errors, setErrors] = useState(null);

  const getCollection = async () => {
    try {
      const response = await fetch(`${BASE_URL}/collection`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });

      if (!response.ok) {
        setErrors(response.statusText);
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setCollectionData(data);
      setIsLoading(false);
      setErrors(null);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCollection = async (bodyData) => {
    try {
      const response = await fetch(`${BASE_URL}/collection`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify(bodyData),
      });

      return response;
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

      setCollectionData((prevData) =>
        prevData.filter(
          (collection) => collection.collection_id !== collectionId
        )
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CollectionContext.Provider
      value={{
        collectionData,
        getCollection,
        addToCollection,
        deleteGameFromCollection,
        isLoading,
        setIsLoading,
        errors,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

CollectionProvider.propTypes = {
  children: propTypes.node.isRequired,
};
