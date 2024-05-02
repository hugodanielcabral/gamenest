import propTypes from "prop-types";
import { useState } from "react";
import { DropDown, Modal } from "../../../../ui/index.js";
import { Menu } from "../../../../ui/menu/Menu.jsx";
import { useCollection } from "../../../../../context/CollectionContext.jsx";
import {
  getActions,
  getMenuGeneral,
} from "../../../../../utils/getCollectionMenuItems.js";
import { ConfirmationMessage } from "../../../../ui/confirmationMessage/ConfirmationMessage.jsx";
import toast from "../../../../../utils/toast.js";

export const CardActions = ({ game }) => {
  const { deleteGameFromCollection } = useCollection();

  const [showDropdown, setShowDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleShowModal = () => {
    setModalOpen(true);
  };

  const handleDeleteGame = async () => {
    deleteGameFromCollection(game.collection_id).then((response) => {
      console.log(game);
      if (response.ok) {
        toast(`${game.game_name} was deleted successfully!`, "success", "#fff");
        setModalOpen(false);
      } else {
        toast("Error deleting game", "error");
      }
    });
  };

  const handleCancelDeleteGame = () => {
    setModalOpen(false);
  };

  const menuItemsActions = getActions(game, handleShowModal);
  const menuItemsGeneral = getMenuGeneral(game);

  return (
    <section className="flex md:flex-col w-full justify-evenly items-center md:w-32">
      <article className="md:-order-1 order-3 self-end">
        <Modal
          isOpen={modalOpen}
          hasCloseBtn={true}
          onClose={() => setModalOpen(false)}
        >
          <ConfirmationMessage
            title="Are you sure?!"
            img={game.game_cover}
            description={`Do you want to delete the ${game.game_name} from your collection?`}
            onConfirm={handleDeleteGame}
            onCancel={handleCancelDeleteGame}
          />
        </Modal>
        <DropDown
          showDropdown={showDropdown}
          handleShowDropdown={handleShowDropdown}
          dropdownId={`game-${game.game_id}`}
          setShowDropdown={setShowDropdown}
        >
          <Menu
            menuItemsActions={menuItemsActions}
            menuItemsGeneral={menuItemsGeneral}
            showDropdown={showDropdown}
          />
        </DropDown>
      </article>
      {/* //! Crear Rating componente */}
      <article className="rating md:order-1 order-2">
        <input
          type="radio"
          name={"rating-" + game.game_id}
          className="mask mask-star-2 bg-info"
        />
        <input
          type="radio"
          name={"rating-" + game.game_id}
          className="mask mask-star-2 bg-info"
        />
        <input
          type="radio"
          name={"rating-" + game.game_id}
          className="mask mask-star-2 bg-info"
        />
        <input
          type="radio"
          name={"rating-" + game.game_id}
          className="mask mask-star-2 bg-info"
        />
        <input
          type="radio"
          name={"rating-" + game.game_id}
          className="mask mask-star-2 bg-info"
        />
      </article>

      <p className="text-white font-semibold">
        Hours played:{" "}
        <span>{game?.hours_played == null ? 0 : game.hours_played}</span>
      </p>
    </section>
  );
};

CardActions.propTypes = {
  game: propTypes.object.isRequired,
};

CardActions.defaultProps = {
  game: {},
};
