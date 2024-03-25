import propTypes from "prop-types";
import { FaPencilAlt } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { getStatusIconCollection } from "../../../utils/getStatusIconCollection";
import clsx from "clsx";

export const CollectionCard = ({ collectionData }) => {
  console.log(collectionData);
  return (
    <div className="col-span-6 md:col-span-4 *:mb-2">
      {collectionData
        ? collectionData.map((collection) => (
            <div
              key={collection?.collection_id}
              className="bg-base-100/90 bg-opacity-90 grid grid-cols-12 shadow-sm shadow-black"
            >
              {/* img and name */}
              <div className="flex items-center gap-x-3 col-span-7 md:col-span-8 lg:col-span-9 p-5">
                <img
                  src={collection?.cover?.url}
                  alt={`Cover from the game ${collection?.name}`}
                />
                <h2 className="font-bold text-base sm:text-xl md:text-2xl lg:text-3xl text-buttons-400">
                  {collection?.name}
                </h2>
              </div>
              {/* platform and status */}
              <div className="flex flex-col gap-5 items-center col-span-4 md:col-span-3 lg:col-span-2 p-5">
                <div className="bg-details-500 rounded-md size-10 h-fit p-1">
                  <p className="text-center text-xl font-bold text-textDark-500">
                    PC
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
                  <button>
                    <FaPencilAlt className="text-buttons-500 dark:text-buttons-300" />
                  </button>
                  <div className="divider"></div>
                  <button>
                    <IoMdMore
                      size={30}
                      className="text-buttons-500 dark:text-buttons-300"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

CollectionCard.propTypes = {
  collectionData: propTypes.array,
};
