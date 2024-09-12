import { Layout } from "../components/layout/Layout";
import { Container } from "../components/ui/container/Container";
import { GamesFinderContent } from "../components/games/finder/content/GamesFinderContent";
import { Pagination } from "../components/games/finder/content/Pagination";

const GamesFinderPage = () => {

  return (
    <Layout>
      <Container className="space-y-4 p-4">
        <section className="grid grid-cols-1 gap-2 lg:grid-cols-3">
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
