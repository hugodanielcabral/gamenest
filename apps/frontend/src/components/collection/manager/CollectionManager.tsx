import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { Layout } from "../../layout/Layout";
import { ManagerHeader } from "./header/ManagerHeader";
import { Container } from "../../ui/container/Container";
import { CollectionManagerContent } from "./content/CollectionManagerContent";

interface GameProps {
  data: {
    id: number;
    name: string;
    cover: {
      id: number;
      url: string;
    };
    slug: string;
    platforms: {
      id: number;
      abbreviation: string;
      name: string;
    }[];
    screenshots: {
      id: number;
      url: string;
    }[];
  };
  isLoading: boolean;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const CollectionManager = () => {
  const { gameSlug } = useParams<{ gameSlug: string }>();
  const { data: game, isLoading } = useFetch(
    `${BASE_URL}/games/${gameSlug}`,
  ) as GameProps;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg mx-auto size-32 sm:size-36 md:size-40 lg:size-44"></span>
      </div>
    );
  }
  return (
    <Layout>
      <Container>
        <ManagerHeader game={game} />
        <CollectionManagerContent game={game} />
      </Container>
    </Layout>
  );
};
