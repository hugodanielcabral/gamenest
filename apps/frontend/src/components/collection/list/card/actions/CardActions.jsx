import propTypes from "prop-types";
import { useState } from "react";
import { DropDown, Modal } from "../../../../ui/index.js";
import { Menu } from "../../../../ui/menu/Menu.jsx";
import {
  getActions,
  getMenuGeneral,
} from "../../../../../utils/getCollectionMenuItems.js";
import { ConfirmationMessage } from "../../../../ui/confirmationMessage/ConfirmationMessage.jsx";
import toast from "../../../../../utils/toast.js";
import { useCollection } from "../../../../../context/CollectionContext.jsx";

export const CardActions = ({ gameData }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { deleteGameFromCollection } = useCollection();

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleShowModal = () => {
    setModalOpen(true);
  };

  const handleDeleteGame = async () => {
    deleteGameFromCollection(gameData.collection_id).then((response) => {
      if (response.ok) {
        toast(
          `${gameData.game_name} was deleted successfully!`,
          "success",
          "#fff"
        );

        setModalOpen(false);
      } else {
        toast("Error deleting game", "error");
      }
    });
  };

  const handleCancelDeleteGame = () => {
    setModalOpen(false);
  };

  const menuItemsActions = getActions(gameData, handleShowModal);
  const menuItemsGeneral = getMenuGeneral(gameData);

  return (
    <article className="col-span-1 row-span-2 relative">
      <section className="absolute bottom-0 md:top-0 right-0">
        <Modal
          isOpen={modalOpen}
          hasCloseBtn={true}
          onClose={() => setModalOpen(false)}
        >
          <ConfirmationMessage
            title="Delete game"
            description={`Are you sure about deleting ${gameData.game_name} from your collection?`}
            onConfirm={handleDeleteGame}
            onCancel={handleCancelDeleteGame}
          />
        </Modal>
        <DropDown
          showDropdown={showDropdown}
          handleShowDropdown={handleShowDropdown}
          dropdownId={`game-${gameData.game_id}`}
          setShowDropdown={setShowDropdown}
        >
          <Menu
            menuItemsActions={menuItemsActions}
            menuItemsGeneral={menuItemsGeneral}
            showDropdown={showDropdown}
          />
        </DropDown>
      </section>
    </article>
  );
};

CardActions.propTypes = {
  gameData: propTypes.object.isRequired,
};

CardActions.defaultProps = {
  gameData: {},
};
