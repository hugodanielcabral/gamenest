import { HomeLatest } from "../components/home/latest/HomeLatest";
import { HomePlatforms } from "../components/home/platforms/HomePlatforms";
import { HomePopular } from "../components/home/popular/HomePopular";
import { Layout } from "../components/layout/Layout";
import { Container } from "../components/ui/container/Container";

const HomePage = () => {
  return (
    <Layout>
      <Container className="flex flex-col space-y-4 p-4 md:space-y-8">
        <HomePopular />
        <HomePlatforms />
        <HomeLatest />
      </Container>
    </Layout>
  );
};

export default HomePage;
