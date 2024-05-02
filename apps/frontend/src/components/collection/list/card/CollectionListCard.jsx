import propTypes from "prop-types";
import { CardBackground } from "../../../ui/cardBackground/CardBackground";
import { CoverImage } from "./coverImage/coverImage";
import { GameDetails } from "./gameDetails/GameDetails";
import { CardActions } from "./actions/CardActions";

export const CollectionListCard = ({ game }) => {
  //TODO 1: Realizar el Update de un game en collection
  //TODO 2: Si el juego ya esta agregado, entonces en su game page, tendria que aparecer un update en vez de add to collection.
  //TODO 3: Agregar esta misma logica por si el usuario es canchero y cambia el /collection/update a collection/add, tendria que reedireccionarlo a game page o colocar que sea update.
  //TODO 4: Agregar la funcionalidad de borrar un juego en collection.(usar el popup para la confirmacion, con toda la accesiblidad.)

  console.log(game);
  const coverImage =
    game?.game_cover ||
    "https://placehold.co/264x352?text=No+Cover+Image+Available";

  return (
    <CardBackground className="group flex gap-2 shadow-black border-l-4 border-l-info hover:border-l-error transition-all duration-300 ease-in-out flex-wrap h-fit md:h-44">
      <CoverImage coverImage={coverImage} gameName={game?.game_name} />
      <GameDetails game={game} />
      <CardActions game={game} />
    </CardBackground>
  );
};

CollectionListCard.propTypes = {
  game: propTypes.object.isRequired,
};
