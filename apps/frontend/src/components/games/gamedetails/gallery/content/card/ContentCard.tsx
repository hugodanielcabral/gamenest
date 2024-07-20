import getImageUrl from "../../../../../../utils/getImageUrl";

interface ContentCardProps {
  coverUrl: string;
  title: string;
}

export const ContentCard = ({ coverUrl, title }: ContentCardProps) => {
  const handleOnMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    let isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) return;

    e.currentTarget.nextElementSibling?.classList.remove("md:hidden", "hidden");
  };

  const handleOnMouseLeave = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.nextElementSibling?.classList.add("md:hidden", "hidden");
  };

  return (
    <>
      <img
        src={getImageUrl(coverUrl, "cover_big")}
        alt={title}
        className="h-32 w-20 cursor-pointer rounded-md border-2 border-gray-700 sm:h-36 sm:w-28 md:h-40 shadow-lg shadow-black"
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      <p className="absolute -left-8 z-10 hidden w-32 text-pretty border border-gray-700 bg-base-100 p-2 text-center text-sm text-white sm:w-36 sm:text-base md:hidden lg:w-44">
        {title}
      </p>
    </>
  );
};
