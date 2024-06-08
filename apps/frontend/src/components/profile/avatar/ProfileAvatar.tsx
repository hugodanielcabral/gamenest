import { useState } from "react";
import { Modal } from "../../ui/modal/Modal";
import { avatarsImages } from "../../../constants/profile/profileConstants";
import { Button } from "../../ui/button/Button";
import "./ProfileAvatar.css";
import clsx from "clsx";
import { FaPencilAlt } from "react-icons/fa";

const EDIT_PROFILE = "Editar perfil";
const SAVE_PROFILE = "Guardar perfil";

export const ProfileAvatar = ({
  user,
  setFormData,
  avatar,
  editButton,
  toggleEditState,
  selectedAvatar,
  setSelectedAvatar
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleShowModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="avatar-container">
      <h1 className="avatar-player-name text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300">
        Perfil de {user?.username}
      </h1>
      {editButton === EDIT_PROFILE && user.user_edit_credits !== 0 && (
        <Button className="order-1" onClick={toggleEditState}>
          {editButton}
        </Button>
        
      )}
      <div className="relative">
        <img
          src={avatar === "" ? user.avatar : avatar}
          alt={"Avatar de" + user?.username}
          className={clsx(
            {
              "border-info border-2 bg-blue-300 opacity-70":
                editButton === SAVE_PROFILE,
              "border-gray-500 border-2": editButton === EDIT_PROFILE,
            },
            "rounded-full size-40 bg-gray-400 bg-opacity-50"
          )}
         
        />

        {editButton === SAVE_PROFILE && (
          <FaPencilAlt
            className="absolute bottom-14 right-14 text-white bg-gray-500 bg-opacity-50 rounded-full p-1 cursor-pointer size-10"
            onClick={editButton === "Guardar perfil" ? handleShowModal : null}
          />
        )}

      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="grid grid-cols-3 gap-4 mb-5">
          {avatarsImages.map((avatar) => (
            <img
              key={avatar.id}
              src={avatar.url}
              alt={avatar.name}
              className={clsx(
                {
                  "border-error border-2": selectedAvatar === avatar.url,
                },
                "rounded-full size-36 cursor-pointer"
              )}
              onClick={() => {
                /* setFormData({ ...user, avatar: avatar.url });
                setModalOpen(false); */
                setSelectedAvatar(avatar.url);
              }}
            />
          ))}
        </div>
        <div className="flex justify-center gap-5 mt-10">
          <Button
            onClick={() => {
              setFormData({ ...user, avatar: selectedAvatar });
              setModalOpen(false);
            }}
          >
            Guardar avatar
          </Button>
          <Button
            className="bg-error hover:bg-error hover:bg-opacity-70"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Salir
          </Button>
        </div>
      </Modal>
    </div>
  );
};
