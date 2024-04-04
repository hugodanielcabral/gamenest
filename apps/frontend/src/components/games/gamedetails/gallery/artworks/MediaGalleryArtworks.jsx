import propTypes from "prop-types";

export const MediaGalleryArtworks = ({
  artworks,
  handleOpenModal,
  handleTypeOfMedia,
  setStartIndex,
}) => {
  const totalArtworks = artworks.length;

  return (
    <>
      {totalArtworks > 0 ? (
        artworks.map((artwork, index) => {
          return (
            <img
              key={artwork.id}
              src={artwork.url.replace("t_thumb", "t_cover_big")}
              className="col-span-2 md:col-span-1 hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer hover:saturate-200 h-28 md:h-32 lg:h-52 w-full object-cover"
              loading="lazy"
              onClick={() => {
                handleOpenModal();
                handleTypeOfMedia("artworks");
                setStartIndex(index);
              }}
              alt={`Artwork ${artwork.id}`}
            />
          );
        })
      ) : (
        <p className="col-span-4 text-center text-3xl">
          No artworks available.
        </p>
      )}
    </>
  );
};

MediaGalleryArtworks.propTypes = {
  artworks: propTypes.object.isRequired,
  handleOpenModal: propTypes.func.isRequired,
  handleTypeOfMedia: propTypes.func.isRequired,
  setStartIndex: propTypes.func.isRequired,
};
