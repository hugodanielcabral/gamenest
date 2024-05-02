import { HomeConnected } from "../components/home/connected/HomeConnected";
import { HomeNotConnected } from "../components/home/notConnected/HomeNotConnected";
import { Layout } from "../components/layout/Layout";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isAuth } = useAuth();

  return <Layout>{isAuth ? <HomeConnected /> : <HomeNotConnected />}</Layout>;
};

export default HomePage;
