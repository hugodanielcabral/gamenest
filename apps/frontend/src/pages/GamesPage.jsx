import { GamesFinder } from "../components/games/gamesfinder/GamesFinder.jsx";
import { Layout } from "../components/layout/Layout.jsx";

const GamesPage = () => {
  return (
    <Layout className="bg-gradient-to-r from-blue-900 from-25% via-black via-60% to-blue-900 p-8">
      <GamesFinder />
    </Layout>
  );
};

export default GamesPage;
