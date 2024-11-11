import { useNavigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout.jsx";
import { ListsContent } from "../components/lists/content/ListsContent.tsx";
import { ListsOrder } from "../components/lists/order/ListsOrder.tsx";
import { ListsPagination } from "../components/lists/pagination/ListsPagination.tsx";
import { ListsSearch } from "../components/lists/search/ListsSearch.tsx";
import { ListsSort } from "../components/lists/sort/ListsSort.tsx";
import { Button } from "../components/ui/button/Button.tsx";
import { Container } from "../components/ui/container/Container";
import { Icon } from "../components/ui/icon/Icon.tsx";
import { useQueryParams } from "../hooks/useQueryParams.ts";

export const MyListsPage = () => {
  const { query } = useQueryParams();
  const navigate = useNavigate();

  return (
    <Layout>
      <Container className="flex flex-col space-y-8 p-4">
        <section className="flex flex-wrap items-center justify-start gap-2 rounded-lg bg-red-500/60 p-2 md:flex-row md:p-4">
          <div className="max-w-sm">
            <h2 className="text-pretty text-lg text-white md:text-xl">
              Mis listas
            </h2>
            <p className="font-nunito text-xs text-gray-300 md:text-sm">
              Aquí encontrarás todas tus listas de juegos.
            </p>
          </div>
          <div className="flex flex-grow items-center gap-2">
            <ListsSearch />
            <div className="flex gap-1">
              <ListsSort />
              <ListsOrder />
            </div>
          </div>
        </section>
        <section className="min-h-screen">
          <div className="mb-2 flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Icon
                name="icon-[tabler--list]"
                className="size-8 text-yellow-400 sm:size-10"
              />
              <h2 className="text-pretty text-2xl text-white sm:text-3xl">
                {query.q
                  ? `Resultados de búsqueda: ${query.q}`
                  : "Todas tus listas"}
              </h2>
            </div>

            <Button
              variant="info"
              className="btn-sm btn-outline md:btn-md lg:btn-lg text-xs md:text-sm lg:text-base text-blue-400/70 hover:text-black/40"
              onClick={() => navigate("/lists/add")}
            >
              <Icon
                name="icon-[tabler--plus]"
                className="size-4 md:size-5 lg:size-6"
              />
              Crear lista
            </Button>
          </div>{" "}
          <ListsContent pathUrl={"user/lists"} />
        </section>
        <section className="flex justify-center">
          <ListsPagination pathUrl={"user/lists"} />
        </section>
      </Container>
    </Layout>
  );
};
