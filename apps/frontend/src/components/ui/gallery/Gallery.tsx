import { useEffect, useRef } from "react";
import getImageUrl from "../../../utils/getImageUrl.js";
/* import clsx from "clsx";
 */
interface GalleryProps {
  data: {
    id: number;
    url: string;
  }[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedScreen: number;
  setSelectedScreen: (selectedScreen: number) => void;
}

export const Gallery = ({
  data,
  isOpen,
  setIsOpen,
  selectedScreen,
  setSelectedScreen,
}: GalleryProps) => {
  const screenCounter = selectedScreen + 1 + " / " + data.length;

  const galleryRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
        galleryRef.current.showModal();
      document.body.style.overflow = "hidden";
    } else {
        galleryRef.current.close();
      setSelectedScreen(0);
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleOnClose = () => {
    galleryRef.current.close();
    setSelectedScreen(0);
    document.body.style.overflow = "auto";
    setIsOpen(false);
  };

  const handleNext = () => {
    if (selectedScreen + 1 === data.length) return null;

    setSelectedScreen(selectedScreen + 1);
  };

  const handlePrev = () => {
    if (selectedScreen === 0) return null;

    setSelectedScreen(selectedScreen - 1);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<EventTarget>) => {
    if ((e as React.KeyboardEvent).key !== "Escape") return;

    setIsOpen(false);
  };

  return (
    <dialog
      className="container mx-auto overflow-auto bg-base-100 p-2 backdrop:bg-base-300 backdrop:bg-opacity-50"
      onKeyDown={handleOnKeyDown}
      ref={galleryRef}
    >
      <div className="relative flex flex-col items-center gap-y-2">
        <p className="absolute top-1 text-white">{screenCounter}</p>
        <button
          className="icon-[zondicons--close-solid] size-8 self-end bg-red-500 hover:bg-red-400"
          onClick={handleOnClose}
        ></button>
        {/*    <div className="flex gap-x-6 overflow-auto bg-base-200 p-2 max-w-96">
          {data.map((el, index) => (
            <img
              key={el.id}
              src={el.url.replace("t_thumb", "t_1080p")}
              alt=""
              className={clsx(
                {
                  "border border-gray-400 object-cover grayscale-0":
                    selectedScreen === index,
                },
                "w-24 cursor-pointer rounded-md object-cover grayscale hover:grayscale-0",
              )}
              onClick={handleOnClick}
              data-index={index}
            />
          ))}
        </div> */}

        <div className="flex flex-row items-center sm:flex-row sm:gap-x-4">
          <button
            className="icon-[ooui--previous-ltr] size-6 bg-white hover:bg-blue-400"
            onClick={handlePrev}
          ></button>

          <button
            className="icon-[ooui--next-ltr] size-6 bg-white hover:bg-blue-400"
            onClick={handleNext}
          ></button>
        </div>
        <img
          src={getImageUrl(data[selectedScreen]?.url, "t_1080p", "t_thumb")}
          className="z-0 max-h-[80vh] max-w-[90vw] object-contain"
          alt={`Foto ${selectedScreen + 1}`}
        />
      </div>
    </dialog>
  );
};
