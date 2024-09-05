import { useParams } from "react-router-dom";
import { Layout } from "../../layout/Layout";
import { useFetch } from "../../../hooks/useFetch";
import { GameDetailsHeader } from "./header/GameDetailsHeader";
import { GameDetailsContent } from "./content/GameDetailsContent";
import type { GameDetailsProps } from "../../../types/gameDetails";



export const GameDetails = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { gameId: gameSlug } = useParams();
  const { data: gameDetail, isLoading } = useFetch(
    `${BASE_URL}/games/${gameSlug}`,
  ) as GameDetailsProps;

  if (isLoading) {
    return <Layout>Loading...</Layout>;
  }

  console.log(gameDetail);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-800 from-50% to-base-100">
        {/* Header */}
        <GameDetailsHeader gameDetail={gameDetail} gameSlug={gameSlug} />
        {/* Contenido: Video, Bundles, sitio web, clasificación de edades, fotos, artworks y videos */}
        <GameDetailsContent gameDetail={gameDetail} />
        {/* Juegos relacionados y otras cosas que no sean principalmente del juego */}
        <section></section>
      </div>
    </Layout>
  );
};
