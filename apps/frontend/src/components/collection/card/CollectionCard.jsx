import propTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { getStatusIconCollection } from "../../../utils/getStatusIconCollection";
import { CardDeleteModal } from "./deleteModal/CardDeleteModal";
import clsx from "clsx";
import { FaPencilAlt, FaInfo, FaTrash } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";

export const CollectionCard = ({ collectionData, handleOnDelete }) => {
  const navigate = useNavigate();

  const handleOnModal = (collection_id) => {
    document.getElementById(`${collection_id}`).showModal();
  };

  return (
    <div className="col-span-6 md:col-span-5 *:mb-2">
      {collectionData ? (
        collectionData.map((collection) => (
          <div
            key={collection?.collection_id}
            className="bg-base-100/90 bg-opacity-90 grid grid-cols-12 shadow-sm shadow-black"
          >
            {/* img and name */}
            <div className="flex items-center gap-x-3 col-span-7 md:col-span-8 lg:col-span-9 p-5">
              <img
                src={collection?.cover?.url.replace("t_thumb", "t_cover_small")}
                alt={`Cover from the game ${collection?.name}`}
              />
              <h2 className="font-bold text-base sm:text-xl md:text-2xl lg:text-3xl text-buttons-400">
                {collection?.name}
              </h2>
            </div>
            {/* platform and status */}
            <div className="flex flex-col gap-5 items-center col-span-4 md:col-span-3 lg:col-span-2 p-5">
              <div className="bg-details-500 rounded-md max-w-32 w-full p-1">
                <p className="text-center text-sm line-clamp-1 font-bold text-textDark-500">
                  {collection.platform}
                </p>
              </div>
              <div
                className={clsx(
                  {
                    "bg-success": collection.status === "Completed",
                    "bg-borders-500": collection.status === "Playing",
                    "bg-danger-500": collection.status === "Plan to play",
                    "bg-danger-700": collection.status === "Dropped",
                    "bg-details-700": collection.status === "No status",
                  },
                  "p-2 rounded-md h-fit w-full"
                )}
              >
                <p className="text-center text-sm md:text-base font-bold flex flex-col items-center gap-2 text-textWhite-600">
                  {getStatusIconCollection(collection.status)}
                  {collection.status}
                </p>
              </div>
            </div>
            {/* edit and ...(gameinfo and delete) buttons */}
            <div className="flex-col col-span-1 w-10 justify-self-end bg-base-300 py-5 h-full">
              <div className="flex flex-col h-full *:h-full *:mx-auto">
                <button
                  onClick={() =>
                    navigate(
                      `/collection/edit/${collection.game_slug}/${collection.collection_id}`
                    )
                  }
                >
                  <FaPencilAlt
                    className="text-buttons-500 dark:text-buttons-300 hover:text-details-700 dark:hover:text-details-500"
                    size={19}
                  />
                </button>
                <div className="divider"></div>
                <div className="dropdown dropdown-top dropdown-end p-0 m-0">
                  <div
                    tabIndex={0}
                    role="button"
                    className="hover:text-details-700 dark:hover:text-details-500 h-full w-full text-buttons-500 dark:text-buttons-300"
                  >
                    <IoMdMore size={30} />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu shadow bg-base-300 w-40 h-fit p-0"
                  >
                    <li>
                      <Link
                        className="p-3 font-bold text-sm text-center"
                        to={`/games/${collection.game_slug}`}
                      >
                        <FaInfo className="dark:text-textDark-100 text-textDark-300" />
                        Game info
                      </Link>
                    </li>
                    <li>
                      <button
                        className="p-3 font-bold text-sm text-center"
                        onClick={() => handleOnModal(collection.collection_id)}
                      >
                        <FaTrash className="text-danger-500" />
                        Delete game
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <CardDeleteModal
              collection={collection}
              handleOnDelete={handleOnDelete}
            />
          </div>
        ))
      ) : (
        <div className="bg-base-100/90 mx-auto flex flex-col items-center p-5">
          <p>You haven&apos;t added any games to your collection yet.</p>
          <Link to="/games" className="text-textDark-200">
            Find and add right now!
          </Link>
        </div>
      )}
    </div>
  );
};

CollectionCard.propTypes = {
  collectionData: propTypes.array,
  handleOnDelete: propTypes.func,
};
