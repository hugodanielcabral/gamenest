import { useState } from "react";
import { Gallery } from "../../../../ui/gallery/Gallery.js";

interface MediaGalleryScreenshotsProps {
  screenshotData: {
    id: number;
    url: string;
  }[];
}

export const MediaGalleryScreenshots = ({
  screenshotData,
}: MediaGalleryScreenshotsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState(0);

  if (!screenshotData) return null;

  return (
    screenshotData && (
      <div className="col-span-4 grid grid-cols-2 gap-2 rounded-md border-2 border-gray-700 bg-base-100 bg-opacity-70 shadow-lg shadow-black p-4 sm:grid-cols-3 md:grid-cols-4">
        <h2 className="col-span-full text-xl text-white uppercase tracking-wider">
          Fotos ({screenshotData.length})
        </h2>

        {screenshotData.map((screenshot, index) => (
          <img
            key={screenshot.id}
            src={screenshot.url.replace("t_thumb", "t_1080p")}
            alt={`Screenshot ${index + 1}`}
            className="transform cursor-pointer rounded-md object-cover shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              setIsOpen(true);
              setSelectedScreen(index);
            }}
            data-index={index}
          />
        ))}

        <Gallery
          data={screenshotData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedScreen={selectedScreen}
          setSelectedScreen={setSelectedScreen}
        />
      </div>
    )
  );
};
