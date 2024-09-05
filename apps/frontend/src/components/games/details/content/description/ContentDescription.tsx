import clsx from "clsx";
import { useState } from "react";

export const ContentDescription = ({ summary, storyline }) => {
  const [readMore, setReadMore] = useState(false);
  const paragraphClasses =
    "font-nunito text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl text-pretty";

  const handleOnReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <>
      <p className={paragraphClasses}>{summary}</p>
      <p
        className={clsx(paragraphClasses, {
          hidden: !readMore,
          block: readMore,
        })}
      >
        {storyline}
      </p>
      {storyline?.length > 0 && (
        <button
          className="rounded-2xl bg-gray-700 p-1 px-2 text-xs text-white hover:bg-opacity-75 md:text-sm"
          onClick={handleOnReadMore}
        >
          {readMore ? "Leer menos ←" : "Leer más →"}
        </button>
      )}
    </>
  );
};
