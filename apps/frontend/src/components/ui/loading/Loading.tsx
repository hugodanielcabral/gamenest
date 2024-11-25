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
        className={`loading mx-auto size-10 sm:size-16 md:size-20 lg:size-28 text-${color} loading-${type}`}
      ></span>
    </div>
  );
};
