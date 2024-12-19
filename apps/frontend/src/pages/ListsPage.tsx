import { Layout } from "../components/layout/Layout.jsx";
import { ListsContent } from "../components/lists/content/ListsContent.tsx";
import { ListsOrder } from "../components/lists/order/ListsOrder.tsx";
import { ListsPagination } from "../components/lists/pagination/ListsPagination.tsx";
import { ListsPopular } from "../components/lists/popular/ListsPopular.tsx";
import { ListsSearch } from "../components/lists/search/ListsSearch.tsx";
import { ListsSort } from "../components/lists/sort/ListsSort.tsx";
import { Container } from "../components/ui/container/Container";
import { Icon } from "../components/ui/icon/Icon.tsx";
import { useQueryParams } from "../hooks/useQueryParams.ts";

export const ListsPage = () => {
  const { query } = useQueryParams();

  return (
    <Layout title="Listas Públicas">
      <Container className="flex flex-col space-y-8 p-4">
        <section className="flex flex-wrap items-center justify-start gap-2 rounded-lg bg-info/60 p-2 md:flex-row md:p-4">
          <div className="max-w-sm">
            <h2 className="text-pretty text-lg text-white md:text-xl">
              Listas
            </h2>
            <p className="font-nunito text-xs text-gray-300 md:text-sm">
              Encuentra las mejores listas de juegos creadas por la comunidad.
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
        {!query.q && (
          <section>
            <div className="mb-2 flex items-center gap-2">
              <Icon
                name="icon-[tabler--chart-bar-popular]"
                className="size-8 text-yellow-400 sm:size-10"
              />
              <h2 className="text-pretty text-2xl text-white sm:text-3xl">
                Top 3 listas
              </h2>
            </div>
            <ListsPopular />
          </section>
        )}

        <section className="min-h-screen">
          <div className="mb-2 flex items-center gap-2">
            <Icon
              name="icon-[tabler--list]"
              className="size-8 text-yellow-400 sm:size-10"
            />
            <h2 className="text-pretty text-2xl text-white sm:text-3xl">
              {
                query.q
                  ? `Resultados de búsqueda: ${query.q}`
                  : "Todas las listas"
              }
            </h2>
          </div>{" "}
          <ListsContent pathUrl={"lists"} />
        </section>
        <section className="flex justify-center">
          <ListsPagination pathUrl={"lists"}/>
        </section>
      </Container>
    </Layout>
  );
};
