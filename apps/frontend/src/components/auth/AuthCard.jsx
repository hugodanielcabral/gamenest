import clsx from "clsx";
import propTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export const AuthCard = ({ children, title, className }) => {
  return (
    <div
      className={twMerge(
        clsx(
          "py-5 mx-auto mt-10 md:mt-20 bg-base-300 bg-opacity-80 rounded-lg shadow-2xl max-w-96 px-7 shadow-black border border-gray-700",
          className
        )
      )}
    >
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white">
        {title}
      </h3>
      {children}
    </div>
  );
};

AuthCard.propTypes = {
  children: propTypes.node,
  title: propTypes.string,
};

AuthCard.defaultProps = {
  children: null,
  title: "",
};
