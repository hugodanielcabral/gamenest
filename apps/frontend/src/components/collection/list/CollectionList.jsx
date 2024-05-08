import propTypes from "prop-types";
import { ListCard } from "./card/ListCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const CollectionList = ({ collectionData }) => {
  const [parent, enableAnimations] = useAutoAnimate();

  return (
    <section
      className="col-span-4 md:col-span-3 grid grid-cols-1 gap-2"
      ref={parent}
    >
      {collectionData.map((game) => (
        <ListCard gameData={game} key={game.id} />
      ))}
    </section>
  );
};

CollectionList.propTypes = {
  collectionData: propTypes.array.isRequired,
};

CollectionList.defaultProps = {
  collectionData: [],
};
