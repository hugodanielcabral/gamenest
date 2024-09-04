import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button/Button.tsx";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export const Message = ({ message, type, navigateTo, btnMessage}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-y-5">
      <p
        className={twMerge(
          clsx("text-base sm:text-lg md:text-xl lg:text-2xl text-info", {
            "text-base sm:text-lg md:text-xl lg:text-2xl text-error":
              type === "error",
          })
        )}
      >
        {message}
      </p>
      <Button className={type === "error" ? "bg-error hover:bg-opacity-70 hover:bg-error" : ""} onClick={() => navigate(navigateTo)}>{btnMessage}</Button>
    </div>
  );
};
