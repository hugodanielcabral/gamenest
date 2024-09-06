import clsx from "clsx";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface CardProps {
  imgSrc?: string | Function;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  linkTo?: string;
}

const CardImage = ({ imgSrc, className, title }: CardProps) => {
  return (
    <figure>
      <img
        src={typeof imgSrc === "function" ? imgSrc() : imgSrc}
        alt={title}
        className={twMerge(clsx("", className))}
      />
    </figure>
  );
};

const CardContent = ({ className, children }: CardProps) => {
  return (
    <div className={twMerge(clsx("card-body", className))}>{children}</div>
  );
};

const Card = ({ className,linkTo = "#", children, ...props }: CardProps) => {
  return (
    <Link to={linkTo}
      className={twMerge(
        clsx(
          "card card-compact w-96 bg-base-100 shadow-xl",
          className,
        ),
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export { Card, CardImage, CardContent };
