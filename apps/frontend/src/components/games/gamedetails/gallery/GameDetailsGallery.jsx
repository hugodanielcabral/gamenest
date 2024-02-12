import propTypes from "prop-types";
import { useState } from "react";
import { MediaModal } from "../overview/media/modal/MediaModal";
import { GalleryScreenshots, GalleryArtworks, GalleryVideos } from "./index.js";

export const GameDetailsGallery = ({ game }) => {
  const { screenshots, artworks, videos, name } = game;

  const [screenArtworks, setScreenArtworks] = useState([
    {
      original: "",
    },
  ]);

  const [screenScreenshots, setScreenScreenshots] = useState([
    {
      original: "",
    },
  ]);

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isArtwork, setIsArtwork] = useState(true);

  const handleModal = (index, isArtwork) => {
    const modal = document.getElementById("gamedetailsmedia_modal");
    modal.showModal();
    setGalleryIndex(index);
    setIsArtwork(isArtwork);
  };

  const handleScreens = (screenData, isArtwork) => {
    if (!screenData) return;
    const media = screenData.map((data) => {
      return {
        original: data.url.replace("t_thumb", "t_1080p"),
      };
    });
    if (isArtwork) {
      setScreenArtworks(media);
    } else {
      setScreenScreenshots(media);
    }
  };

  return (
    <div className="flex flex-col gap-5 mt-2">
      <GalleryScreenshots
        screenshots={screenshots}
        handleModal={(index) => handleModal(index, false)}
        name={name}
        handleScreens={(data) => handleScreens(data, false)}
      />

      <GalleryArtworks
        artworks={artworks}
        handleModal={(index) => handleModal(index, true)}
        name={name}
        handleScreens={(data) => handleScreens(data, true)}
      />

      <GalleryVideos videos={videos} />

      <MediaModal
        screen={isArtwork ? screenArtworks : screenScreenshots}
        galleryIndex={galleryIndex}
      />
    </div>
  );
};

GameDetailsGallery.propTypes = {
  game: propTypes.object.isRequired,
};
