import propTypes from "prop-types";
import { ListCard } from "./card/ListCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const CollectionList = ({ collectionData }) => {
  const [parent, enableAnimations] = useAutoAnimate();

  return (
    <section
      className="col-span-4 flex flex-wrap justify-start gap-x-1 gap-y-2 *:mx-auto *:sm:mx-0 md:gap-y-6 lg:col-span-4"
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
