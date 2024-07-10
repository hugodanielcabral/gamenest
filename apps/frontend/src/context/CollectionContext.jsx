import propTypes from "prop-types";
import { createContext, useState, useContext } from "react";
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
  const [totalPages, setTotalPages] = useState(1);
  const [filtersData, setFiltersData] = useState([]);
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

  const getGameFromCollection = async (gameSlug) => {
    try {
      const response = await fetch(`${BASE_URL}/collection/game/${gameSlug}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const addToCollection = async (bodyData) => {
    try {
      const response = await fetch(`${BASE_URL}/collection/add/game`, {
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

  const updateGameFromCollection = async (gameSlug, bodyData) => {
    try {
      const response = await fetch(
        `${BASE_URL}/collection/update/${gameSlug}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
          body: JSON.stringify(bodyData),
        },
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

      setCollectionData(
        collectionData.filter((game) => game.collection_id !== collectionId),
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalCollectionPages = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/collection/totalPages${search}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setTotalPages(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getCollectionFilters = async () => {
    try {
      const response = await fetch(`${BASE_URL}/collection/filters`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setFiltersData(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CollectionContext.Provider
      value={{
        collectionData,
        getCollection,
        getGameFromCollection,
        getCollectionFilters,
        addToCollection,
        updateGameFromCollection,
        deleteGameFromCollection,
        totalPages,
        getTotalCollectionPages,
        isLoading,
        setIsLoading,
        errors,
        search,
        filtersData,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

CollectionProvider.propTypes = {
  children: propTypes.node.isRequired,
};
