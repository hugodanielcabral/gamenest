import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch.ts";
import { Layout } from "../../layout/Layout";
import { ManageHeader } from "./header/ManageHeader";
import { ManageDisplayDetails } from "./displayDetails/ManageDisplayDetails";
import { CollectionManageSkeleton } from "./skeleton/CollectionManageSkeleton";
import { BackgroundImage } from "../../ui/index.js";
import gameDetailsBg from "../../../assets/backgrounds/gamesdetails-background.webp";
import getImageUrl from "../../../utils/getImageUrl";
import "react-loading-skeleton/dist/skeleton.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const CollectionManage = () => {
  const { gameSlug } = useParams();
  const { data, isLoading } = useFetch(`${BASE_URL}/games/${gameSlug}`);

  let gameScreenshot;

  if (data?.screenshots?.length) {
    gameScreenshot = getImageUrl(
      data.screenshots[0]?.url,
      "t_screenshot_med_2x",
      "t_thumb",
    );
  } else {
    gameScreenshot = gameDetailsBg;
  }

  return isLoading ? (
    <CollectionManageSkeleton />
  ) : (
    <Layout>
      <BackgroundImage
        backgroundImage={gameScreenshot}
        className="opacity-35 gradient-mask-b-[rgb(0,0,0,1)_0%,rgb(0,0,0,0.4)_80%,rgb(0,0,0,0.5)_0%]"
      >
        <article className="container relative z-10 mx-auto grid grid-cols-4 gap-5 p-4">
          <ManageHeader data={data} />
          <ManageDisplayDetails data={data} gameSlug={gameSlug} />
        </article>
      </BackgroundImage>
    </Layout>
  );
};
