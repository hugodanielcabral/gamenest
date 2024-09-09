import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={twMerge(
        clsx("input input-bordered w-full max-w-xs input-xs sm:input-sm md:input-md", className),
      )}
      {...props}
    />
  );
};
