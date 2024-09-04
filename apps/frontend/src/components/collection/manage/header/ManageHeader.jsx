import propTypes from "prop-types";
import { Button } from "../../../ui/button/Button.tsx";
import { CardImage } from "../../../ui/card/image/CardImage";
import { useLocation, useNavigate } from "react-router-dom";
import getImageUrl from "../../../../utils/getImageUrl";
import clsx from "clsx";

export const ManageHeader = ({ data }) => {
  const COVER_IMAGE =
    data?.cover?.url ||
    "https://via.placeholder.com/300x400?text=No+Cover+Available";

  const { pathname } = useLocation();

  const determineActionType = pathname.includes("/add/")
    ? "AGREGAR"
    : "ACTUALIZAR";

  const navigate = useNavigate();

  return (
    <section className="col-span-4">
      <header className="flex flex-col items-center justify-around p-4 md:flex-row">
        <div className="flex flex-col gap-y-3">
          <figure className="order-last md:order-first">
            <CardImage
              src={getImageUrl(COVER_IMAGE, "cover_big")}
              alt={`${data?.name} cover`}
            />
          </figure>

          <Button
            className="w-full text-lg font-bold uppercase"
            aria-label={`View ${data?.name} game page`}
            onClick={() => navigate(`/games/${data?.slug}`)}
          >
            Página del juego
          </Button>
        </div>

        <div className="mt-5 flex flex-col gap-y-5">
          <h1
            className={clsx(
              {
                "text-error": determineActionType === "ACTUALIZAR",
                "text-success": determineActionType === "AGREGAR",
              },
              "self-center text-xl font-bold uppercase sm:text-3xl md:text-4xl lg:text-5xl",
            )}
          >
            {determineActionType} JUEGO
          </h1>
          <h2 className="mb-5 text-center text-2xl text-blue-400 sm:text-3xl md:mb-10 md:text-4xl">
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
