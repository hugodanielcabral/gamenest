import { useState } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export const Tooltip = ({ text, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute -right-8 top-9 z-10 min-w-24 text-pretty rounded-md bg-base-300 bg-opacity-70 p-2 text-center text-xs tracking-tight sm:top-10 sm:-left-7 text-white md:-left-7 md:top-12">
          {text}
        </div>
      )}
    </div>
  );
};
