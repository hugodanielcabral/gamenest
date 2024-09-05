import type { GameDetailsProps } from "../../../types/gameDetails";
import { useFetch } from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Layout } from "../../layout/Layout";
import { GameDetailsHeader } from "./header/GameDetailsHeader";
import { GameDetailsContent } from "./content/GameDetailsContent";
import { GameDetailsSkeleton } from "./skeleton/GameDetailsSkeleton";

export const GameDetails = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { gameId: gameSlug } = useParams();
  const { data: gameDetail, isLoading } = useFetch(
    `${BASE_URL}/games/${gameSlug}`,
  ) as GameDetailsProps;

  if (isLoading) {
    return (
      <Layout>
        <GameDetailsSkeleton />
      </Layout>
    );
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
