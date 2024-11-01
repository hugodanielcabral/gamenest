import { Layout } from "../components/layout/Layout.jsx";
import { ListsOrder } from "../components/lists/order/ListsOrder.js";
import { ListsSearch } from "../components/lists/search/ListsSearch.js";
import { ListsSort } from "../components/lists/sort/ListsSort.js";
import { Container } from "../components/ui/container/Container";

export const ListsPage = () => {
  
  return (
    <Layout>
      <Container className="space-y-4 p-4">
        {/* Search */}
        {/* Sort and Order */}
        <section className="flex flex-col flex-wrap justify-start gap-2 md:flex-row">
          {/* Search */}
          <ListsSearch />
          {/* Sort and Order */}
          <div className="flex gap-1">
            <ListsSort />
            <ListsOrder />
          </div>
        </section>
        <section className="relative grid grid-cols-1 gap-y-4 lg:grid-cols-4 lg:gap-x-2">
          {/* Content */}
        </section>
        <section className="flex justify-center">{/* Pagination */}</section>
      </Container>
    </Layout>
  );
};
