import { FaPencilAlt } from "react-icons/fa";
import { IoMdMore, IoLogoGameControllerA } from "react-icons/io";

export const CollectionCard = ({ collectionData }) => {
  return (
    <div className="col-span-6 md:col-span-4 *:mb-5">
      {collectionData
        ? collectionData.map((collection) => (
            <div
              key={collection?.id}
              className="bg-base-100 bg-opacity-70 grid grid-cols-12 shadow-2xl shadow-black"
            >
              {/* img and name */}
              <div className="flex items-center gap-x-3 col-span-7 md:col-span-8 lg:col-span-9 p-5">
                <img
                  src={collection?.cover?.url}
                  alt={`Cover from the game ${collection?.name}`}
                />
                <h2 className="font-bold text-base sm:text-xl md:text-2xl lg:text-3xl">
                  {collection?.name}
                </h2>
              </div>
              {/* platform and status */}
              <div className="flex flex-col gap-5 items-center col-span-4 md:col-span-3 lg:col-span-2 p-5">
                <div className="bg-blue-500 rounded-md size-10 h-fit p-1">
                  <p className="text-center text-xl font-bold text-white">PC</p>
                </div>
                <div className="bg-red-700 w-fit py-1 px-5 h-fit rounded-md">
                  <p className="text-center text-xl font-bold flex items-center gap-2 text-white">
                    <IoLogoGameControllerA />
                    {collection.status}
                  </p>
                </div>
              </div>
              {/* edit and ...(gameinfo and delete) buttons */}
              <div className="flex-col col-span-1 w-10 justify-self-end bg-base-300 py-5 h-full">
                <div className="flex flex-col h-full *:h-full *:mx-auto">
                  <button>
                    <FaPencilAlt />
                  </button>
                  <div className="divider"></div>
                  <button>
                    <IoMdMore size={25} />
                  </button>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};
