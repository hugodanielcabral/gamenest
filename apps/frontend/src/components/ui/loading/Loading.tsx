import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface LoadingProps {
  className?: string;
  color: "primary" | "secondary" | "accent" | "neutral" | "success" | "warning" | "error" | "info";
  type?: "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity";
}

export const Loading = ({
  color = "primary",
  type,
  className,
}: LoadingProps) => {
  return (
    <div className={twMerge(clsx(className))}>
      <span
        className={`loading mx-auto size-32 sm:size-36 md:size-40 lg:size-44 text-${color} loading-${type}`}
      ></span>
    </div>
  );
};
