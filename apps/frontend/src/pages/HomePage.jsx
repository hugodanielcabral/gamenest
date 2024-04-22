import { HomeConnected } from "../components/home/connected/HomeConnected";
import { HomeNotConnected } from "../components/home/notConnected/HomeNotConnected";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isAuth } = useAuth();

  return isAuth ? <HomeConnected /> : <HomeNotConnected />;
};

export default HomePage;
