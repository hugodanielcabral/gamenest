import type { GameDetailsProps } from "../../../types/gameDetails";
import { useFetch } from "../../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../layout/Layout";
import { GameDetailsHeader } from "./header/GameDetailsHeader";
import { GameDetailsContent } from "./content/GameDetailsContent";

export const GameDetails = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { gameId: gameSlug } = useParams();
  const { data: gameDetail, isLoading } = useFetch(
    `${BASE_URL}/games/${gameSlug}`,
  ) as GameDetailsProps;
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg mx-auto size-32 sm:size-36 md:size-40 lg:size-44"></span>
      </div>
    );
  }

  if (!gameDetail) {
    navigate("/404");
  }
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-800 from-50% to-base-100">
        <GameDetailsHeader gameDetail={gameDetail} gameSlug={gameSlug} />
        <GameDetailsContent gameDetail={gameDetail} />
      </div>
    </Layout>
  );
};
