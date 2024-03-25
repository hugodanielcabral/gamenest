import propTypes from "prop-types";
import { Button } from "../../../../components/ui/index.js";

export const CardDeleteModal = ({ collection, handleOnDelete }) => {
  return (
    <>
      <dialog
        id={collection.collection_id}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">
            You are about to delete the game{" "}
            <span className="text-danger-500 font-bold">{collection.name}</span>{" "}
            from your collection
          </p>
          <div className="modal-action">
            <form method="dialog" className="space-x-4">
              <Button
                className="bg-danger-500"
                onClick={() => handleOnDelete(collection.collection_id)}
              >
                Delete
              </Button>
              <Button>Cancel</Button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

CardDeleteModal.propTypes = {
  collection: propTypes.object.isRequired,
  handleOnDelete: propTypes.func.isRequired,
};
