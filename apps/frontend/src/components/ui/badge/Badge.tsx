import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ children, className }: BadgeProps) => {
  return (
    <div
      className={twMerge(
        clsx("badge badge-error badge-xs sm:badge-sm md:badge-md", className),
      )}
    >
      {children}
    </div>
  );
};
