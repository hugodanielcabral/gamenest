import propTypes from "prop-types";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export const MediaModal = ({ screen, galleryIndex }) => {
  return (
    <dialog id="gamedetailsmedia_modal" className=" modal">
      <div className="w-full max-w-full max-h-full bg-opacity-90 modal-box">
        <ImageGallery
          items={screen}
          showThumbnails={false}
          showPlayButton={false}
          showBullets={true}
          showFullscreenButton={false}
          showNav={true}
          showIndex={true}
          lazyLoad={true}
          startIndex={galleryIndex}
        />

        <div className="absolute top-0 modal-action">
          <form method="dialog">
            <button className="text-2xl btn bg-base-content text-error">
              X
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

MediaModal.propTypes = {
  screen: propTypes.array.isRequired,
  galleryIndex: propTypes.number.isRequired,
};
