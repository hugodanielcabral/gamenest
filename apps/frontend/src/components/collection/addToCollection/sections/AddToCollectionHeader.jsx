import propTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../ui/index.js";
import clsx from "clsx";

export const AddToCollectionHeader = ({ data, gameSlug }) => {
  const { collectionId } = useParams();
  const navigate = useNavigate();

  return (
    <section className="col-span-2 flex flex-col md:flex-row justify-around bg-base-100/90 bg-opacity-90 shadow-sm shadow-black p-3">
      <div className="flex flex-col justify-around p-3 gap-y-2 items-center">
        <img
          src={
            data.cover
              ? `${data.cover.url.replace("t_thumb", "t_cover_big")}`
              : "https://via.placeholder.com/300x400?text=No+Cover+Available"
          }
          alt={`${data?.name} cover`}
          className="size-auto max-h-72 border-2 border-buttons-300 dark:border-buttons-300"
        />
        <Button
          className="btn-md transition-all duration-500 ease-in-out disabled:pointer-events-none disabled:opacity-15 bg-details-600 hover:bg-details-300 text-textDark-600 font-bold"
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
                "text-details-600": collectionId,
              },
              "text-2xl uppercase font-bold text-buttons-400"
            )}
          >
            {collectionId
              ? "Edit Game in Collection"
              : "Add Game to Collection"}
          </h1>
          <h2 className="text-2xl font-bold text-buttons-400">{data?.name}</h2>
        </div>
      </div>
    </section>
  );
};

AddToCollectionHeader.propTypes = {
  data: propTypes.array.isRequired,
  gameSlug: propTypes.string.isRequired,
};
