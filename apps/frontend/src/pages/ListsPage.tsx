import { Layout } from "../components/layout/Layout.jsx";
import { ListsContent } from "../components/lists/content/ListsContent.js";
import { ListsOrder } from "../components/lists/order/ListsOrder.js";
import { ListsPagination } from "../components/lists/pagination/ListsPagination.js";
import { ListsSearch } from "../components/lists/search/ListsSearch.js";
import { ListsSort } from "../components/lists/sort/ListsSort.js";
import { Container } from "../components/ui/container/Container";

export const ListsPage = () => {
  return (
    <Layout>
      <Container className="flex flex-col space-y-4 p-4">
        <section className="flex flex-col flex-wrap justify-start gap-2 md:flex-row">
          {/* Search */}
          <ListsSearch />
          {/* Sort and Order */}
          <div className="flex gap-1">
            <ListsSort />
            <ListsOrder />
          </div>
        </section>
        <section className="min-h-screen">
          <ListsContent />
        </section>
        <section className="flex justify-center">
          <ListsPagination />
        </section>
      </Container>
    </Layout>
  );
};
