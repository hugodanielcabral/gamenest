import clsx from "clsx";

interface ProgressProps extends React.HTMLProps<HTMLProgressElement> {
  progressValue: number;
  className?: string;
}

export const Progress = ({
  progressValue,
  className,
  ...props
}: ProgressProps) => {
  return (
    <progress
      className={clsx("progress w-full", className)}
      value={progressValue}
      {...props}
    ></progress>
  );
};
