import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { MediaGalleryScreenshoots } from "./screenshots/MediaGalleryScreenshoots";
import { MediaGalleryVideos } from "./videos/MediaGalleryVideos";
import { MediaGalleryArtworks } from "./artworks/MediaGalleryArtworks";
import { Modal } from "../../../ui/modal/Modal";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { MediaGalleryAdditionalInfo } from "./additionalinfo/MediaGalleryAdditionalInfo";

export const GameDetailsMediaGallery = ({ data, activeTab }) => {
  const [modalOpen, setModalOpen] = useState(false);

  //* I set the default value of the mediaData state to an object with the original and thumbnail properties, this is because the ImageGallery component requires these properties to work correctly.
  const [mediaData, setMediaData] = useState([
    {
      original: "",
      thumbnail: "",
    },
  ]);

  //* I set the default value of the typeOfMedia state to "screenshots", this is because the screenshots tab is the default tab that is displayed when the user enters the game details page.
  const [typeOfMedia, setTypeOfMedia] = useState("screenshots");
  const [startIndex, setStartIndex] = useState(0);

  const handleTypeOfMedia = (type) => {
    //* I set the typeOfMedia state to the type that is passed as an argument (which can be either screenshots or artworks).
    //* I don't accept videos because react-image-gallery doesn't support videos.
    setTypeOfMedia(type);
  };

  const handleMediaData = () => {
    if (typeOfMedia === "screenshots" && data?.screenshots) {
      setMediaData(
        data?.screenshots?.map((screenshot) => ({
          original: screenshot.url.replace("t_thumb", "t_1080p"),
          thumbnail: screenshot.url.replace("t_thumb", "t_720p"),
        }))
      );
    }

    if (typeOfMedia === "artworks" && data?.artworks) {
      setMediaData(
        data?.artworks?.map((artwork) => ({
          original: artwork.url.replace("t_thumb", "t_1080p"),
          thumbnail: artwork.url.replace("t_thumb", "t_720p"),
        }))
      );
    }
  };

  useEffect(() => {
    handleMediaData();
  }, [typeOfMedia]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      {activeTab === 1 && (
        <MediaGalleryScreenshoots
          screenshots={data?.screenshots}
          handleOpenModal={handleOpenModal}
          handleTypeOfMedia={handleTypeOfMedia}
          setStartIndex={setStartIndex}
        />
      )}

      {activeTab === 2 && <MediaGalleryVideos videos={data?.videos} />}

      {activeTab === 3 && (
        <MediaGalleryArtworks
          artworks={data?.artworks}
          handleOpenModal={handleOpenModal}
          handleTypeOfMedia={handleTypeOfMedia}
          setStartIndex={setStartIndex}
        />
      )}

      {activeTab === 4 && <MediaGalleryAdditionalInfo data={data} />}

      <Modal
        isOpen={modalOpen}
        hasCloseBtn={true}
        onClose={() => setModalOpen(false)}
      >
        <ImageGallery
          items={mediaData}
          showPlayButton={false}
          showNav={false}
          showBullets={true}
          autoPlay={false}
          lazyLoad={true}
          startIndex={startIndex}
        />
      </Modal>
    </>
  );
};

GameDetailsMediaGallery.propTypes = {
  data: propTypes.object.isRequired,
  activeTab: propTypes.number.isRequired,
};

GameDetailsMediaGallery.defaultProps = {
  data: {},
  activeTab: 1,
};
