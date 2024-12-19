import { Layout } from "../components/layout/Layout";
import { Container } from "../components/ui/container/Container";
import { CollectionFilters } from "../components/collection/filters/CollectionFilters.js";
import { CollectionContent } from "../components/collection/content/CollectionContent.js";
import { CollectionActiveFilters } from "../components/collection/activeFilters/CollectionActiveFilters.js";
import { CollectionSearch } from "../components/collection/search/CollectionSearch.tsx";
import { CollectionPagination } from "../components/collection/pagination/CollectionPagination.tsx";
import { CollectionSort } from "../components/collection/sort/CollectionSort.tsx";
import { CollectionOrder } from "../components/collection/order/CollectionOrder.tsx";
import { useQueryParams } from "../hooks/useQueryParams.ts";
import { useDataFetch } from "../hooks/useDataFetch.ts";
import { toast } from "sonner";

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
    user_id: string;
  }[];
  isLoading: boolean;
  setFetchData: (data: any) => void;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const CollectionPage = () => {
  const { getQueryString } = useQueryParams();

  const {
    fetchData: collections,
    isLoading,
    setFetchData,
  } = useDataFetch("collection", `${getQueryString()}`) as DataFetch;

  const deleteGameCollection = async (collection_id: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}/collection/delete/game/${collection_id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
        },
      );

      if (response.status !== 204) {
        toast.error("Error al eliminar el juego de tu colección", {
          duration: 3000,
          className:
            "bg-error text-white text-xs md:text-sm text-white font-nunito",
        });

        return;
      }

      toast.success("Juego eliminado de tu colección", {
        duration: 3000,
        className:
          "bg-success text-white text-xs md:text-sm text-white font-nunito",
      });
      setFetchData((prev: DataFetch["fetchData"]) =>
        prev.filter((item) => item.collection_id !== collection_id),
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout title="Colección">
      <Container className="space-y-4 p-4">
        <section className="flex flex-col flex-wrap justify-start gap-2 md:flex-row">
          <CollectionSearch />
          <section className="flex gap-1">
            <CollectionSort />
            <CollectionOrder />
          </section>
          <CollectionActiveFilters />
        </section>
        <section className="grid grid-cols-1 gap-y-4 lg:grid-cols-4 lg:gap-x-2">
          <CollectionFilters collections={collections} />
          <CollectionContent
            deleteGameCollection={deleteGameCollection}
            collections={collections}
            isLoading={isLoading}
          />
        </section>
        <section className="flex justify-center">
          <CollectionPagination />
        </section>
      </Container>
    </Layout>
  );
};
