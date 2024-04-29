import propTypes from "prop-types";
import { Button } from "../../../ui";
import getImageUrl from "../../../../utils/getImageUrl";
import { useLocation, useNavigate } from "react-router-dom";

export const ManageHeader = ({ data }) => {
  const COVER_IMAGE =
    data?.cover?.url ||
    "https://via.placeholder.com/300x400?text=No+Cover+Available";

  const { pathname } = useLocation();

  const determineActionType = pathname.includes("/add/") ? "ADD" : "EDIT";

  const navigate = useNavigate();

  return (
    <section className="col-span-4">
      <header className=" p-4 flex justify-around items-center md:flex-row flex-col">
        <div className="flex flex-col gap-y-3">
          <figure className="order-last md:order-first">
            <img
              src={getImageUrl(COVER_IMAGE, "cover_big")}
              loading="lazy"
              alt={`${data?.name} cover`}
              className="flex-grow shadow-2xl shadow-black"
            />
          </figure>

          <Button
            className="w-full font-bold text-lg uppercase"
            aria-label={`View ${data?.name} game page`}
            onClick={() => navigate(`/games/${data?.slug}`)}
          >
            View game page
          </Button>
        </div>

        <div className="flex flex-col gap-y-5 mt-5">
          <h1 className="text-3xl md:text-6xl font-bold text-white">
            {determineActionType} GAME
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-300 self-center">
            {data?.name}
          </h2>
        </div>
      </header>
    </section>
  );
};

ManageHeader.propTypes = {
  data: propTypes.object.isRequired,
};

ManageHeader.defaultProps = {
  data: {},
};
