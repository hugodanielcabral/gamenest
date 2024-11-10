import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../layout/Layout";
import { Container } from "../../ui/container/Container";
import { useDataFetch } from "../../../hooks/useDataFetch";
import { Loading } from "../../ui/loading/Loading.tsx";
import { ListDetailsUserPanel } from "./panel/ListDetailsUserPanel.tsx";
import { DetailsContent } from "./content/DetailsContent.tsx";
import type { ListsProps } from "../../../types/lists.ts";
import { Toaster } from "sonner";


export const ListDetailsPage = () => {
  const { listId } = useParams();
  const navigate = useNavigate();

  const { fetchData, isLoading } = useDataFetch<ListsProps["fetchData"]>(
    `lists/${listId}`,
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading color="primary" type="ring" />
      </div>
    );
  }

  if (fetchData === null) {
    navigate("/404");
  }

  return (
    <Layout>
      <Toaster position="top-center" visibleToasts={1} />
      <Container className="flex flex-col space-y-4 p-4">
        <section className="">
          <h2 className="text-pretty font-nunito text-xl text-white md:text-2xl lg:text-3xl">
            {fetchData.list.title}
          </h2>
        </section>
        <section className="grid grid-cols-4">
          <DetailsContent list={fetchData.games} ownedGames={fetchData.ownedGames}/>
          <ListDetailsUserPanel list={fetchData.list} />
        </section>
      </Container>
    </Layout>
  );
};
