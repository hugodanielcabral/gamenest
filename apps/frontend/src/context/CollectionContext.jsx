import propTypes from "prop-types";
import { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
  const { search } = useLocation();
  const [collectionData, setCollectionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const getCollection = async () => {
    try {
      const response = await fetch(`${BASE_URL}/collection${search}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData.message);
        setIsLoading(false);
        setCollectionData([]);
        throw new Error(errorData.message);
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

  const updateGameFromCollection = async (collectionId, bodyData) => {
    try {
      const response = await fetch(
        `${BASE_URL}/collection/update/${collectionId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
          body: JSON.stringify(bodyData),
        }
      );

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

  useEffect(() => {
    getCollection();
  }, [search]);

  return (
    <CollectionContext.Provider
      value={{
        collectionData,
        getCollection,
        addToCollection,
        updateGameFromCollection,
        deleteGameFromCollection,
        isLoading,
        setIsLoading,
        errors,
        search,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

CollectionProvider.propTypes = {
  children: propTypes.node.isRequired,
};
