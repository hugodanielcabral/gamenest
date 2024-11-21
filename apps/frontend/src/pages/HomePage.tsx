import { HomePopular } from "../components/home/popular/HomePopular";
import { Layout } from "../components/layout/Layout";
import { Container } from "../components/ui/container/Container";

const HomePage = () => {
  return (
    <Layout>
      <Container className="flex flex-col space-y-4 p-4">
        <HomePopular />
      </Container>
    </Layout>
  );
};

export default HomePage;
