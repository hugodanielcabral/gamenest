import { useParams } from "react-router-dom";
import { ManageHeader } from "./header/ManageHeader";
import { ManageDisplayDetails } from "./displayDetails/ManageDisplayDetails";
import getImageUrl from "../../../utils/getImageUrl";
import { CollectionManageSkeleton } from "./skeleton/CollectionManageSkeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Layout } from "../../layout/Layout";
import gameDetailsBg from "../../../assets/backgrounds/gamesdetails-background.webp";
import { BackgroundImage } from "../../ui/index.js";
import { useFetch } from "../../../hooks/useFetch.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const CollectionManage = () => {
  const { gameSlug } = useParams();
  const { data, isLoading } = useFetch(`${BASE_URL}/games/${gameSlug}`);

  let gameScreenshot;

  if (data?.screenshots?.length) {
    gameScreenshot = getImageUrl(
      data.screenshots[0]?.url,
      "t_screenshot_huge",
      "t_thumb"
    );
  } else {
    gameScreenshot = gameDetailsBg;
  }

  return isLoading ? (
    <CollectionManageSkeleton />
  ) : (
    <Layout>
      <BackgroundImage backgroundImage={gameScreenshot} endOpacity={"80"}>
        <article className="relative z-10 p-4 container mx-auto grid-cols-4 grid gap-5">
          <ManageHeader data={data} />
          <ManageDisplayDetails data={data} gameSlug={gameSlug} />
        </article>
      </BackgroundImage>
    </Layout>
  );
};
