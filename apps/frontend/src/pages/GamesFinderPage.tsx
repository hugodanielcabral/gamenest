import { Layout } from "../components/layout/Layout";
import { Container } from "../components/ui/container/Container";
import { GamesFinderContent } from "../components/games/finder/content/GamesFinderContent";
import { Pagination } from "../components/games/finder/content/Pagination";
import { GamesFinderSearch } from "../components/games/finder/search/GamesFinderSearch";

const GamesFinderPage = () => {
  return (
    <Layout>
      <Container className="space-y-4 p-4">
        <section>
          <GamesFinderSearch />
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
