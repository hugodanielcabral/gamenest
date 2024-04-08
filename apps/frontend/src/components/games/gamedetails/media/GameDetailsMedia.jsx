import propTypes from "prop-types";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Button } from "../../../ui/index.js";
import { tabsGameDetailsMediaData } from "../../../../utils/getGameDetailsMediaIcons.jsx";
import { Modal } from "../../../ui/modal/Modal.jsx";
import { clsx } from "clsx";
import rightArrow from "../../../../assets/icons/arrow-right.svg";
import { useNavigate } from "react-router-dom";

export const GameDetailsMedia = ({ data, handleOnClick, activeTab }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const summaryTextLength = data?.summary?.length;

  const gameCover =
    data?.cover?.url.replace("t_thumb", "t_1080p") ||
    "https://via.placeholder.com/300x400?text=No+Cover+Available";

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="grid grid-cols-4 gap-4 items-stretch">
      <div className="col-span-4 md:col-span-1 flex flex-col gap-3">
        <img
          className="flex-grow shadow-2xl shadow-black"
          src={gameCover}
          alt={`Cover of ${data?.name}`}
        />
        <Button
          className="w-full font-bold text-lg"
          onClick={() => navigate(`/collection/add/${data?.slug}`)}
        >
          Add to collection
        </Button>
      </div>
      <div className="col-span-4 md:col-span-3 flex flex-col gap-3">
        {data?.videos ? (
          <div className="flex-grow min-h-[200px] md:min-h-[300px] shadow-2xl shadow-black">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${data.videos[0].video_id}`}
              light={true}
              width={"100%"}
              height={"100%"}
              controls={true}
              muted={true}
            />
          </div>
        ) : (
          <div className="flex-grow min-h-[200px] md:min-h-[300px] shadow-2xl shadow-black ">
            <img
              src="https://via.placeholder.com/600x200?text=No+Video+Available"
              alt="No Video Available"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <p className="font-semibold line-clamp-6 md:p-0 md:line-clamp-2 bg-base-300/60">
          {data?.summary || (
            <p className="text-center">No summary available.</p>
          )}
        </p>
        <div className="flex items-center justify-end">
          <button
            className={clsx(
              {
                hidden: summaryTextLength < 236,
                inline: summaryTextLength > 236,
              },
              "font-semibold text-error text-lg"
            )}
            onClick={handleOpenModal}
          >
            Read more.
            <img
              src={rightArrow}
              alt="Read more arrow"
              className="size-10 inline"
            />
          </button>
        </div>
      </div>
      <div className="col-span-4 my-2">
        <div
          role="tablist"
          className="tabs tabs-bordered gap-4 flex flex-wrap justify-center items-center *:w-[150px] md:w-auto"
        >
          {tabsGameDetailsMediaData.map((tab) => (
            <a
              key={tab.id}
              role="tab"
              onClick={() => handleOnClick(tab.id)}
              className={`tab flex-grow text-base md:text-xl  ${
                tab.id === activeTab
                  ? "tab-active text-info font-bold"
                  : "text-white "
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.name}</span>
            </a>
          ))}
        </div>
        <Modal
          isOpen={modalOpen}
          hasCloseBtn={true}
          onClose={() => setModalOpen(false)}
        >
          <h2 className="font-bold text-3xl text-info text-center">
            {data.name}
          </h2>
          <p className="text-base text-pretty md:text-2xl ">{data?.summary}</p>
        </Modal>
      </div>
    </div>
  );
};

GameDetailsMedia.propTypes = {
  data: propTypes.object.isRequired,
  handleOnClick: propTypes.func.isRequired,
  activeTab: propTypes.number.isRequired,
};
