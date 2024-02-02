import { createContext, useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import propTypes from "prop-types";

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
      const response = await fetch(url);
      const data = await response.json();
      setGames(data.games);
      setTotalPages(data.count);
      setIsLoading(false);
    };

    fetchGames();
  }, [searchParams]);

  return (
    <GamesContext.Provider
      value={{
        games,
        setGames,
        isLoading,
        setPage,
        page,
        searchParams,
        totalPages,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}

GamesProvider.propTypes = {
  children: propTypes.node.isRequired,
};
