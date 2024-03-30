import propTypes from "prop-types";
import { GameCardRating } from "../../../gameshome/card/rating/GameCardRating";
import { Button } from "../../../../ui/index.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const HeaderRating = ({ rating, slug }) => {
  const navigate = useNavigate();
  const [collectionData, setCollectionData] = useState([]);

  const getAllGamesFromUser = async (queryParams) => {
    try {
      const response = await fetch(
        `${BASE_URL}/collection${queryParams ? `?${queryParams}` : ""}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      const data = await response.json();
      setCollectionData(data.fullData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGamesFromUser();
  }, []);

  return (
    <div className="flex flex-col items-center col-span-5 gap-y-3 md:justify-evenly md:col-span-1">
      <GameCardRating rating={rating} />

      {collectionData.length > 0 &&
      collectionData.some((game) => game.game_slug === slug) ? (
        <Button
          onClick={() => navigate(`/collection`)}
          className="text-lg bg-details-500 text-textDark-500 font-bold"
        >
          Already in collection
        </Button>
      ) : (
        <Button
          onClick={() => navigate(`/collection/add/${slug}`)}
          className="text-lg font-bold"
        >
          Add to collection
        </Button>
      )}
    </div>
  );
};

HeaderRating.propTypes = {
  rating: propTypes.number.isRequired,
  slug: propTypes.string.isRequired,
};
