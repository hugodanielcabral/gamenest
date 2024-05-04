import propTypes from "prop-types";
import { ListCard } from "./card/ListCard";

export const CollectionList = ({ collectionData }) => {
  return (
    <section className="col-span-4 md:col-span-3 grid grid-cols-1 gap-5">
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
