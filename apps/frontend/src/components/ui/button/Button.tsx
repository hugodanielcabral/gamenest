import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  className?: string;
  
}

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  error: "btn-error",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
};

const sizes = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        clsx("btn", variants[variant], sizes[size], className),
      )}
      {...props}
    >
      {children}
    </button>
  );
};
