import { Link } from "react-router-dom";
import getImageUrl from "../../../../utils/getImageUrl";
import React from "react";

export const CardImage = ({ url, alt }: { url: string; alt: string; }) => {
  return (
    <img
      src={getImageUrl(url, "cover_big_2x")}
      alt={alt}
      className="w-16 rounded-lg object-cover sm:w-20 md:w-24 lg:w-28"
    />
  );
};

export const CardTitle = ({ children }: { children: React.ReactNode; }) => {
  return (
    <div className="flex-grow">
      <h2 className="line-clamp-1 text-pretty text-xs text-white sm:text-sm md:text-base">
        {children}
      </h2>
    </div>
  );
};

export const CardBody = ({ children }: { children: React.ReactNode; }) => {
  return <div className="relative z-10 flex w-full gap-4">{children}</div>;
};

export const Card = ({
  backgroundImage,
  linkTo = "#",
  children,
}: {
  backgroundImage: string;
  linkTo: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      className="group relative flex h-32 gap-4 overflow-hidden rounded-lg border border-gray-700 bg-base-100 p-4 transition-all duration-300 ease-in-out hover:border-gray-600 hover:bg-base-200 sm:h-36 md:h-40 lg:h-44"
      to={linkTo}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-30"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {children}
    </Link>
  );
};
