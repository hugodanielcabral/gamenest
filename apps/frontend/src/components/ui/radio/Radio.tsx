import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Radio = ({ className, ...props }: RadioProps) => {
  return (
    <input
      type="radio"
      className={twMerge(clsx("radio checked:bg-info radio-xs sm:radio-sm md:radio-md", className))}
      {...props}
    />
  );
};
