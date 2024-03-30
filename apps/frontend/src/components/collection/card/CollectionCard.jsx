import propTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { getStatusIconCollection } from "../../../utils/getStatusIconCollection";
import { CardDeleteModal } from "./deleteModal/CardDeleteModal";
import clsx from "clsx";
import { FaPencilAlt, FaInfo, FaTrash } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { Loading } from "../../ui";

export const CollectionCard = ({
  collectionData,
  handleOnDelete,
  isLoading,
}) => {
  const navigate = useNavigate();

  const handleOnModal = (collection_id) => {
    document.getElementById(`${collection_id}`).showModal();
  };

  return (
    <div className="col-span-6 md:col-span-5 *:mb-2">
      {!isLoading ? (
        collectionData ? (
          collectionData.map((collection) => (
            <div
              key={collection?.collection_id}
              className="bg-base-100/90 bg-opacity-90 grid grid-cols-12 shadow-sm shadow-black"
            >
              {/* img and name */}
              <div className="flex items-center gap-x-3 col-span-7 md:col-span-8 lg:col-span-9 p-5">
                <img
                  src={collection?.cover?.url.replace(
                    "t_thumb",
                    "t_cover_small"
                  )}
                  alt={`Cover from the game ${collection?.name}`}
                />
                <h2 className="font-bold text-base sm:text-xl md:text-2xl lg:text-3xl text-primary">
                  {collection?.name}
                </h2>
              </div>
              {/* platform and status */}
              <div className="flex flex-col gap-5 items-center col-span-4 md:col-span-3 lg:col-span-2 p-5">
                <div className="dark:bg-slate-600 bg-slate-600 max-w-32 w-full p-2">
                  <p className="text-center text-sm line-clamp-1 font-bold text-white">
                    {collection.platform}
                  </p>
                </div>
                <div
                  className={clsx(
                    {
                      "bg-success/80": collection.status === "Completed",
                      "bg-info/80": collection.status === "Playing",
                      "bg-warning/80": collection.status === "Plan to play",
                      "bg-error/80": collection.status === "Dropped",
                      "bg-accent/80": collection.status === "No status",
                    },
                    "p-2 h-fit w-full"
                  )}
                >
                  <p className="text-center text-sm md:text-base font-bold flex flex-col items-center gap-2 text-white">
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
                    <FaPencilAlt className="hover:text-success" size={19} />
                  </button>
                  <div className="divider"></div>
                  <div className="dropdown dropdown-top dropdown-end p-0 m-0">
                    <div
                      tabIndex={0}
                      role="button"
                      className="hover:text-info h-full w-full"
                    >
                      <IoMdMore size={40} />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu shadow bg-base-300 w-40 h-fit p-0"
                    >
                      <li>
                        <Link
                          className="p-3 text-sm text-center"
                          to={`/games/${collection.game_slug}`}
                        >
                          <FaInfo className="text-info" />
                          Game info
                        </Link>
                      </li>
                      <li>
                        <button
                          className="p-3 text-sm text-center"
                          onClick={() =>
                            handleOnModal(collection.collection_id)
                          }
                        >
                          <FaTrash className="text-error" />
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
            <Link to="/games" className="text-info font-bold">
              Find and add right now!
            </Link>
          </div>
        )
      ) : (
        <div className="bg-base-100/90 mx-auto flex flex-col items-center p-5">
          <Loading />
        </div>
      )}
    </div>
  );
};

CollectionCard.propTypes = {
  collectionData: propTypes.array,
  handleOnDelete: propTypes.func,
  isLoading: propTypes.bool,
};
