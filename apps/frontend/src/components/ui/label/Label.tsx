import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface LabelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Label = ({ title, className, children }: LabelProps) => {
  return (
    <label
      className={twMerge(
        clsx(
          "label m-2 cursor-pointer rounded-lg border-2 border-gray-800 bg-base-100 p-2",
          className,
        ),
      )}
    >
      <span className="label-text text-xs sm:text-sm md:text-base text-white">{title}</span>
      {children}
    </label>
  );
};
