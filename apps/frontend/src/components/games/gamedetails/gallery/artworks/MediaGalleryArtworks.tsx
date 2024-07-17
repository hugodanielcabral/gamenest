import { useState } from "react";
import { Gallery } from "../../../../ui/gallery/Gallery";

interface MediaGalleryArtworksProps {
  artworkData: {
    id: number;
    url: string;
  }[];
}

export const MediaGalleryArtworks = ({
  artworkData,
}: MediaGalleryArtworksProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState(0);

  return (
    artworkData && (
      <div className="col-span-4 grid grid-cols-2 gap-2 rounded-md border-2 border-gray-700 bg-base-200 bg-opacity-70 p-4 sm:grid-cols-3 md:grid-cols-4">
        <h2 className="col-span-full text-xl text-white">
          Artworks ({artworkData?.length})
        </h2>
        {artworkData.map((artwork, index) => (
          <img
            key={artwork.id}
            src={artwork.url.replace("t_thumb", "t_1080p")}
            alt={`Artwork ${index + 1}`}
            className="transform cursor-pointer rounded-md object-cover shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              setIsOpen(true);
              setSelectedScreen(index);
            }}
            data-index={index}
          />
        ))}
        <Gallery
          data={artworkData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedScreen={selectedScreen}
          setSelectedScreen={setSelectedScreen}
        />
      </div>
    )
  );
};
