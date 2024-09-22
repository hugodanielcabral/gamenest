import { Layout } from "../components/layout/Layout";
import { Container } from "../components/ui/container/Container";
import { CollectionFilters } from "../components/collection/filters/CollectionFilters.js";
import { CollectionContent } from "../components/collection/content/CollectionContent.js";
import { CollectionActiveFilters } from "../components/collection/activeFilters/CollectionActiveFilters.js";
import { CollectionSearch } from "../components/collection/search/CollectionSearch.tsx";
import { CollectionPagination } from "../components/collection/pagination/CollectionPagination.tsx";
import { CollectionSort } from "../components/collection/sort/CollectionSort.tsx";
import { CollectionOrder } from "../components/collection/order/CollectionOrder.tsx";

export const CollectionPage = () => {
  return (
    <Layout>
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
          <CollectionFilters />
          <CollectionContent />
        </section>
        <section className="flex justify-center">
          <CollectionPagination />
        </section>
      </Container>
    </Layout>
  );
};
