import React, { useRef } from "react";
import { Icon } from "../icon/Icon";

export const CarouselItem = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export const Carousel = ({ children }: { children: React.ReactNode }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth;
      carouselRef.current.scrollLeft += scrollAmount;
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth;
      carouselRef.current.scrollLeft -= scrollAmount;
    }
  };

  return (
    <div className="relative overflow-hidden">
      <button
        onClick={handlePrev}
        className="absolute -left-2 top-1/2 z-10 -translate-y-1/2"
        aria-label="Desplazar al elemento anterior"
      >
        <Icon
          name="icon-[iconamoon--arrow-left-2-bold]"
          className="size-10 text-gray-300 hover:text-gray-400 sm:size-12 md:size-14 lg:size-16"
        />
      </button>

      <div
        ref={carouselRef}
        className="flex w-full gap-2 overflow-x-scroll scroll-smooth p-2 lg:overflow-x-hidden"
      >
        {children}
      </div>

      <button
        onClick={handleNext}
        className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 bg-transparent shadow-lg"
      >
        <Icon
          name="icon-[iconamoon--arrow-right-2-bold]"
          className="size-10 text-gray-300 hover:text-gray-400 sm:size-12 md:size-14 lg:size-16"
          aria-label="Desplazar al siguiente elemento"
        />
      </button>
    </div>
  );
};
