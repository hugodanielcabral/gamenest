import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import "./Collapse.css"

interface CollapseProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  detailsClassName?: string;
  summaryClassName?: string;
}

export const Collapse = ({
  title,
  children,
  isOpen = true,
  detailsClassName,
  summaryClassName,
}: CollapseProps) => {
  return (
    <details className="bg-base-200 details collapse" open={isOpen}>
      <summary
        className={twMerge(
          clsx(
            "collapse-title collapse-open summary text-white",
            detailsClassName,
          ),
        )}
      >
        {title}
      </summary>
      <div className={twMerge(clsx("collapse-content", summaryClassName))}>
        {children}
      </div>
    </details>
  );
};
