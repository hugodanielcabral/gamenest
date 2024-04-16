import propTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../ui/index.js";
import clsx from "clsx";
import { CardBackground } from "../../../ui/cardBackground/CardBackground.jsx";

export const AddToCollectionHeader = ({ data, gameSlug }) => {
  const { collectionId } = useParams();
  const navigate = useNavigate();

  return (
    <CardBackground className="col-span-2 flex flex-col md:flex-row justify-around">
      <div className="flex flex-col justify-around p-3 gap-y-2 items-center">
        <img
          src={
            data.cover
              ? `${data.cover.url.replace("t_thumb", "t_1080p	")}`
              : "https://via.placeholder.com/300x400?text=No+Cover+Available"
          }
          alt={`${data?.name} cover`}
          className="max-h-72 border-2 border-info bg-cover bg-center bg-no-repeat shadow-lg"
        />
        <Button
          className="btn-md transition-all duration-500 ease-in-out disabled:pointer-events-none disabled:opacity-15 font-bold"
          onClick={() => navigate(`/games/${gameSlug}`)}
        >
          VIEW GAME PAGE
        </Button>
      </div>

      <div className="flex flex-col justify-around items-center md:items-start">
        <div>
          <h1
            className={clsx(
              {
                "text-error": collectionId,
              },
              "text-2xl md:text-3xl uppercase font-bold text-error"
            )}
          >
            {collectionId
              ? "Edit Game in Collection"
              : "Add Game to Collection"}
          </h1>
          <h2 className="text-xl text-center md:text-2xl font-bold text-white text-pretty">
            {data?.name}
          </h2>
        </div>
      </div>
    </CardBackground>
  );
};

AddToCollectionHeader.propTypes = {
  data: propTypes.array.isRequired,
  gameSlug: propTypes.string.isRequired,
};
