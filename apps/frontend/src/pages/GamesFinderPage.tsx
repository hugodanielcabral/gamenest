import { Layout } from "../components/layout/Layout";
import { Container } from "../components/ui/container/Container";
import { GamesFinderContent } from "../components/games/finder/content/GamesFinderContent";
import { Pagination } from "../components/games/finder/content/Pagination";
import { GamesFinderSearch } from "../components/games/finder/search/GamesFinderSearch";
import { GamesFinderOrder } from "../components/games/finder/order/GamesFinderOrder";
import { GamesFinderSort } from "../components/games/finder/sort/GamesFinderSort";
import { GamesFinderActiveFilters } from "../components/games/finder/activeFilters/GamesFinderActiveFilters";
import { GamesFinderFilters } from "../components/games/finder/filters/GamesFinderFilters";

const GamesFinderPage = () => {
  return (
    <Layout title="Buscador de juegos">
      <Container className="space-y-4 p-4">
        <section className="flex flex-col flex-wrap justify-start gap-2 md:flex-row">
          <GamesFinderSearch />
          <div className="flex gap-1">
            <GamesFinderSort />
            <GamesFinderOrder />
          </div>
          <GamesFinderActiveFilters />
        </section>
        <section className="relative grid grid-cols-1 gap-y-4 lg:gap-x-2 lg:grid-cols-4">
          <GamesFinderFilters />
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
