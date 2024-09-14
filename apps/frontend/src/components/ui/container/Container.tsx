import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Container = ({ className, children }: ContainerProps) => {
  return (
    <div
      className={twMerge(
        clsx(
          "min-h-screen bg-gradient-to-b from-gray-800 from-50% to-base-300",
          className,
        ),
      )}
    >
      {children}
    </div>
  );
};
