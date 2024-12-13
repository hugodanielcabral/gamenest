import { HomeAnticipated } from "../components/home/anticipated/HomeAnticipated";
import { HomeGenres } from "../components/home/genres/HomeGenres";
import { HomeLatest } from "../components/home/latest/HomeLatest";
import { HomePlatforms } from "../components/home/platforms/HomePlatforms";
import { HomePopular } from "../components/home/popular/HomePopular";
import { Layout } from "../components/layout/Layout";
import { Container } from "../components/ui/container/Container";

const HomePage = () => {
  
  return (
    <Layout title={"Inicio"}>
      <Container className="flex flex-col space-y-6 p-4 md:space-y-12">
        <HomePopular />
        <HomePlatforms />
        <HomeLatest />
        <HomeGenres />
        <HomeAnticipated />
      </Container>
    </Layout>
  );
};

export default HomePage;
