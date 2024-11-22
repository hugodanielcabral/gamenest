import { HomePlatforms } from "../components/home/platforms/HomePlatforms";
import { HomePopular } from "../components/home/popular/HomePopular";
import { Layout } from "../components/layout/Layout";
import { Container } from "../components/ui/container/Container";

const HomePage = () => {
  return (
    <Layout>
      <Container className="flex flex-col space-y-4 md:space-y-8 p-4">
        <HomePopular />
        <HomePlatforms />
      </Container>
    </Layout>
  );
};

export default HomePage;
