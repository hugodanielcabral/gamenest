import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps {
  imgSrc?: string | Function;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

const CardImage = ({ imgSrc, className, title }: CardProps) => {
  return (
    <img
      src={typeof imgSrc === "function" ? imgSrc() : imgSrc}
      alt={title}
      className={twMerge(
        clsx("h-full rounded-md border-2 border-gray-700", className),
      )}
    />
  );
};

const CardContent = ({ className, children }: CardProps) => {
  return (
    <div
      className={twMerge(
        clsx(
          "card-content absolute bottom-0 z-10 flex h-full w-full flex-col items-center justify-center rounded-md border-2 bg-base-100 bg-opacity-0 opacity-0 transition-all duration-300 ease-in-out group-hover:border-gray-500 group-hover:bg-opacity-90 group-hover:opacity-100",
          className,
        ),
      )}
    >
      {children}
    </div>
  );
};

const Card = ({ className, children }: CardProps) => {
  return (
    <div className={twMerge(clsx("group relative", className))}>{children}</div>
  );
};

export { Card, CardImage, CardContent };
