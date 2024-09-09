import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface OptionProps extends React.HTMLProps<HTMLOptionElement> {
  text: string;
}

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  children: React.ReactNode;
}

export const Option = ({ text, ...props }: OptionProps) => {
  return <option {...props}>{text}</option>;
};

export const Select = ({ className, children, ...props }: SelectProps) => {
  return (
    <select
      className={twMerge(
        clsx("select select-bordered w-full select-xs sm:select-sm md:select-md", className),
      )}
      {...props}
    >
      {children}
    </select>
  );
};
