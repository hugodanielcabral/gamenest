import propTypes from "prop-types";
import { useEffect } from "react";

export const GalleryArtworks = ({
  artworks,
  handleModal,
  name,
  handleScreens,
}) => {
  useEffect(() => {
    if (!artworks) return;
    handleScreens(artworks, true);
  }, []);

  return (
    <div className="p-3 bg-base-200">
      <h2 className="text-2xl font-bold">Artworks</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
        {artworks
          ? artworks.map((artwork, index) => (
              <img
                key={artwork.id}
                src={artwork.url.replace("t_thumb", "t_cover_big")}
                className="object-cover w-full h-40 transition-all duration-200 ease-in-out transform border-transparent rounded-md cursor-pointer min-h-32 hover:border-accent hover:border hover:scale-105 max-h-40"
                alt={`Artwork ${index} of the game ${name}`}
                onClick={() => handleModal(index, true)}
              />
            ))
          : "No artworks available"}
      </div>
    </div>
  );
};

GalleryArtworks.propTypes = {
  artworks: propTypes.array.isRequired,
  handleModal: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  handleScreens: propTypes.func.isRequired,
};
