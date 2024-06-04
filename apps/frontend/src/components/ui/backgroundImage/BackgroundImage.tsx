import clsx from "clsx";
import { twMerge } from "tailwind-merge";


interface BackgroundImageProps {
  children: React.ReactNode;
  backgroundImage: string;
  endOpacity?: number;
  className?: string;
}

export const BackgroundImage = ({
  children,
  backgroundImage,
  className,
}: BackgroundImageProps
) => {
  return (
    <div className="min-h-screen">
      <img
        src={backgroundImage}
       
        className={twMerge(clsx(
          `w-full h-full object-cover absolute left-0 right-0 gradient-mask-b-[rgb(0,0,0,1)_0%,rgb(0,0,0,0.4)_0%,rgb(0,0,0,0.5)_80%]`,
          className,
        ))}
      />
      <div className="relative z-10 p-4 container mx-auto">{children}</div>
    </div>
  );
};

