import propTypes from "prop-types";

export const CardProgressNotes = ({ gameData }) => {
  const PROGRESS_NOTES = gameData?.progress_notes;

  return (
    <div className="col-span-4 md:col-span-3">
      <p className="italic text-balance line-clamp-3">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus corrupti
        sit asperiores dolores, suscipit assumenda quisquam adipisci eligendi
        voluptate totam optio consequuntur nobis reprehenderit facere animi vel
        dolor cumque ullam.
      </p>
    </div>
  );
};

CardProgressNotes.propTypes = {
  gameData: propTypes.object.isRequired,
};

CardProgressNotes.defaultProps = {
  gameData: {},
};
