import propTypes from "prop-types";
import { createContext, useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";

const GamesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGames = () => {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error("useGames must be used within a GamesProvider");
  }
  return context;
};

export function GamesProvider({ children }) {
  const [searchParams] = useSearchParams();
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { params, handleFilterChange } = useQuery("games");

  useEffect(() => {
    let pageParams = Number(searchParams.get("page")) || 0;
    let gameNameParams = searchParams.get("gamename") || "";
    setPage(pageParams);

    const fetchGames = async () => {
      setIsLoading(true);
      let url = `http://localhost:3000/api/games?page=${pageParams}`;
      if (gameNameParams.trim() !== "") {
        url += `&gamename=${gameNameParams}`;
      }
      if (searchParams.get("platforms")) {
        url += `&platforms=${searchParams.get("platforms")}`;
      }
      if (searchParams.get("genres")) {
        url += `&genres=${searchParams.get("genres")}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setGames(data.games);
      setTotalPages(data.count);
      setIsLoading(false);
    };

    fetchGames();
  }, [searchParams]);

  const getGame = async (gameId) => {
    const response = await fetch(`http://localhost:3000/api/games/${gameId}`);
    const data = await response.json();
    return data;
  };

  return (
    <GamesContext.Provider
      value={{
        games,
        setGames,
        isLoading,
        page,
        setPage,
        searchParams,
        totalPages,
        handleFilterChange,
        params,
        getGame,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}

GamesProvider.propTypes = {
  children: propTypes.node.isRequired,
};
