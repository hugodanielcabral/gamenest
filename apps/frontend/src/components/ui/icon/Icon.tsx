import clsx from "clsx";

interface IconProps {
  name: string;
  className?: string;
}

export const Icon = ({ name, className }: IconProps) => {
  return <span className={clsx([name, className])}></span>;
};
