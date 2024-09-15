import { Layout } from "../components/layout/Layout";
import { Container } from "../components/ui/container/Container";
import { GamesFinderContent } from "../components/games/finder/content/GamesFinderContent";
import { Pagination } from "../components/games/finder/content/Pagination";
import { GamesFinderSearch } from "../components/games/finder/search/GamesFinderSearch";
import { GamesFinderOrder } from "../components/games/finder/order/GamesFinderOrder";
import { GamesFinderSort } from "../components/games/finder/sort/GamesFinderSort";
import { GamesFinderActiveFilters } from "../components/games/finder/activeFilters/GamesFinderActiveFilters";

const GamesFinderPage = () => {
  return (
    <Layout>
      <Container className="space-y-12 p-4">
        <section className="flex flex-col justify-start gap-2 md:flex-row flex-wrap">
          <GamesFinderSearch />
          <div className="flex gap-1">
            <GamesFinderSort />
            <GamesFinderOrder />
          </div>
          <GamesFinderActiveFilters />
        </section>
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <GamesFinderContent />
        </section>
        <section className="flex justify-center">
          <Pagination />
        </section>
      </Container>
    </Layout>
  );
};

export default GamesFinderPage;
