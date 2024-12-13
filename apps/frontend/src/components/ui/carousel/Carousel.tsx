import { useRef, useState, useEffect } from "react";
import { Icon } from "../icon/Icon";
import clsx from "clsx";

export const CarouselItem = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export const Carousel = ({ children }: { children: React.ReactNode }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const handleNext = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth;
      carouselRef.current.scrollLeft += scrollAmount;
      updateButtonVisibility();
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth;
      carouselRef.current.scrollLeft -= scrollAmount;
      updateButtonVisibility();
    }
  };

  const updateButtonVisibility = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowPrevButton(scrollLeft > 0);
      setShowNextButton(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    updateButtonVisibility();
    const handleScroll = () => updateButtonVisibility();
    const $carousel = carouselRef.current;

    if ($carousel) {
      $carousel.addEventListener("scroll", handleScroll);
    }

    return () => {
      if ($carousel) {
        $carousel.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="group relative overflow-hidden">
      {showPrevButton && (
        <button
          onClick={handlePrev}
          className={clsx(
            "absolute -left-2 top-1/2 z-10 hidden h-full -translate-y-1/2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:bg-base-100/70 group-hover:opacity-100 md:block",
          )}
          aria-label="Desplazar al elemento anterior"
        >
          <Icon
            name="icon-[iconamoon--arrow-left-2-bold]"
            className="size-10 text-gray-300 hover:text-gray-400 sm:size-12 md:size-14 lg:size-16"
          />
        </button>
      )}

      <div
        ref={carouselRef}
        className="flex w-full gap-4 overflow-x-scroll scroll-smooth p-2 lg:overflow-x-hidden"
      >
        {children}
      </div>

      {showNextButton && (
        <button
          onClick={handleNext}
          className="absolute -right-2 top-1/2 z-10 hidden h-full -translate-y-1/2 opacity-0 shadow-lg transition-opacity duration-300 ease-in-out group-hover:bg-base-100/70 group-hover:opacity-100 md:block"
          aria-label="Desplazar al siguiente elemento"
        >
          <Icon
            name="icon-[iconamoon--arrow-right-2-bold]"
            className="size-10 text-gray-300 hover:text-gray-400 sm:size-12 md:size-14 lg:size-16"
          />
        </button>
      )}
    </div>
  );
};
