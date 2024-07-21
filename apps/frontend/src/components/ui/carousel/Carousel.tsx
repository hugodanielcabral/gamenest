import { useAutoAnimate } from "@formkit/auto-animate/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface CarouselProps {
  length: number;
  start?: number;
  end?: number;
  children: React.ReactNode;
  className?: string;
}

export const Carousel = ({
  length,
  start = 0,
  end = 3,
  className,
  children,
}: CarouselProps) => {
  const [parent, enableAnimations] = useAutoAnimate();

  const [prevCard, setPrevCard] = useState(start);
  const [nextCard, setNextCard] = useState(end);

  const handleNextCard = () => {
    if (nextCard === length) {
      setPrevCard(start);
      setNextCard(end);

      return;
    }

    setNextCard((prev) => prev + 1);
    setPrevCard((prev) => prev + 1);
  };

  const handlePrevCard = () => {
    if (prevCard === 0) return null;

    setPrevCard((prev) => prev - 1);
    setNextCard((prev) => prev - 1);
  };

  useEffect(() => {
    setPrevCard(start);
    setNextCard(end);
  }, [start, end]);

  return (
    <div
      className={twMerge(
        clsx(
          "flex justify-center items-center rounded-md bg-base-300 bg-opacity-70 p-4",
          className,
        ),
      )}
    >
      <button
        className="icon-[ooui--previous-ltr] size-5 bg-white hover:bg-blue-400 sm:size-12 mt-20"
        onClick={handlePrevCard}
      ></button>
      <ul className="flex justify-center gap-2 rounded-md p-4" ref={parent}>
        {Array.isArray(children) ? children.slice(prevCard, nextCard) : null}
      </ul>

      <button
        className="icon-[ooui--next-ltr] size-5 bg-white hover:bg-blue-400 sm:size-12 mt-20"
        onClick={handleNextCard}
      ></button>
    </div>
  );
};
