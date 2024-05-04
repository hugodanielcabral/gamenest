import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { ManageHeader } from "./header/ManageHeader";
import { ManageDisplayDetails } from "./displayDetails/ManageDisplayDetails";
import getImageUrl from "../../../utils/getImageUrl";
import { CollectionManageSkeleton } from "./skeleton/CollectionManageSkeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Layout } from "../../layout/Layout";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const CollectionManage = () => {
  const { gameSlug } = useParams();
  const { data, isLoading } = useFetch(`${BASE_URL}/games/${gameSlug}`);

  const BACKGROUND_IMAGE =
    data?.screenshots[0]?.url ||
    "https://via.placeholder.com/300x400?text=No+Cover+Available";

  return isLoading ? (
    <CollectionManageSkeleton />
  ) : (
    <Layout>
      <div className="min-h-screen">
        <img
          src={getImageUrl(BACKGROUND_IMAGE, "screenshot_huge")}
          className="w-full absolute left-0 right-0 gradient-mask-b-[rgb(0,0,0,1),rgb(0,0,0,0.4)_0%,rgb(0,0,0,0)]"
          alt={`Background of ${data?.name}`}
        />
        <article className="relative z-10 p-4 container mx-auto grid-cols-4 grid gap-5">
          <ManageHeader data={data} />
          <ManageDisplayDetails data={data} />
        </article>
      </div>
    </Layout>
  );
};
