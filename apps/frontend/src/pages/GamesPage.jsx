import { GamesFinder } from "../components/games/gamesfinder/GamesFinder.jsx";
import { Layout } from "../components/layout/Layout.jsx";

const GamesPage = () => {
  return (
    <Layout className="min-h-screen bg-gradient-to-b from-gray-800 from-50% to-base-100 p-8">
      <GamesFinder />
    </Layout>
  );
};

export default GamesPage;
