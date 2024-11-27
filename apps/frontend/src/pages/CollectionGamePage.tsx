import { useParams } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Container } from "../components/ui/container/Container.js";
import { useDataFetch } from "../hooks/useDataFetch.js";
import { Loading } from "../components/ui/loading/Loading.js";
import { CollectionGamePageHeader } from "../components/collection/gamePage/header/CollectionGamePageHeader.js";
import { Toaster } from "sonner";
import { CollectionGamePageContent } from "../components/collection/gamePage/content/CollectionGamePageContent.js";

interface DataFetch {
  fetchData: {
    id: number;
    collection_id: number;
    game_id: string;
    game_name: string;
    game_slug: string;
    game_cover: string;
    hours_played: number;
    minutes_played: number;
    rating: number;
    ownership_name: string;
    status_name: string;
    platform_name: string;
    store_name: string;
    is_favorite: boolean;
    difficulty: string;
    cover: {
      id: number;
      url: string;
    };
    start_date: string;
    finish_date: string;
    amount_paid: string;
    format_name: string;
    user_id: string;
  }[];
  isLoading: boolean;
}

export const CollectionGamePage = () => {
  const { gameSlug } = useParams<{ gameSlug: string }>();
  const { fetchData: collection, isLoading } = useDataFetch(
    `collection/game/${gameSlug}`,
  ) as DataFetch;

  return isLoading ? (
    <div className="flex min-h-screen items-center justify-center">
      <Loading color="info" type="dots" />
    </div>
  ) : (
    <Layout>
      <Container className="space-y-4">
        <CollectionGamePageHeader collection={collection} />
        <CollectionGamePageContent collection={collection} />
        <Toaster position="top-center" visibleToasts={1} />
      </Container>
    </Layout>
  );
};
