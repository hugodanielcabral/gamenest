import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface MediaListProps {
  id?: number;
  url?: string;
  name?: string;
  className?: string;
  icon: string;
}

export const MediaList = ({
  id,
  url,
  name,
  className,
  icon,
}: MediaListProps) => {

  return (
    <li className="rounded-md border-2 border-gray-700 bg-base-300 bg-opacity-50 px-1 pt-1 md:px-2 md:pt-2 shadow-md shadow-black">
      {url ? (
        <a href={url} target="_blank" rel="noreferrer" aria-label="Media Link">
          <span
            className={twMerge(clsx(
              icon,
              "size-4 bg-white hover:bg-gray-400 sm:size-5 md:size-6" + className,
              
            ))}
          ></span>
        </a>
      ) : (
        <span
          className={clsx(
            icon,
            className,
            "size-4 bg-white hover:bg-gray-400 sm:size-5 md:size-6",
          )}
        ></span>
      )}
    </li>
  );
};
