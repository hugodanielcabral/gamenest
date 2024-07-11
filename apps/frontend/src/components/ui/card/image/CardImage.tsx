import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CardImage = ({ src, alt, className }: CardImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={twMerge(
        clsx(
          "h-72 rounded-md shadow-2xl shadow-black sm:h-80 md:h-96",
          className,
        ),
      )}
    />
  );
};
