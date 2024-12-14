import type { GameDetailsProps } from "../../../types/gameDetails";
import { useFetch } from "../../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../layout/Layout";
import { GameDetailsHeader } from "./header/GameDetailsHeader";
import { GameDetailsContent } from "./content/GameDetailsContent";
import { Loading } from "../../ui/loading/Loading.tsx";
import { Container } from "../../ui/container/Container.tsx";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const GameDetails = () => {
  const { gameId: gameSlug } = useParams();
  const { data: gameDetail, isLoading } = useFetch(
    `${BASE_URL}/games/${gameSlug}`,
  ) as GameDetailsProps;
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Loading
        className="mx-auto flex min-h-screen flex-col justify-center"
        color="info"
        type="dots"
      />
    );
  }

  if (!gameDetail) {
    navigate("/404");
  }

  return (
    <Layout title={gameDetail?.name}>
      <Container className="flex flex-col space-y-6 md:space-y-12">
        <GameDetailsHeader gameDetail={gameDetail} gameSlug={gameSlug} />
        <GameDetailsContent gameDetail={gameDetail} />
      </Container>
    </Layout>
  );
};
