import clsx from "clsx";
import { Icon } from "../icon/Icon";
import { useEffect } from "react";

interface DrawerProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Drawer = ({ title, children, isOpen, setIsOpen }: DrawerProps) => {
  const handleBodyOverflow = () => {
    if (window.innerWidth >= 768 || !isOpen) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  useEffect(() => {
    handleBodyOverflow();
    window.addEventListener("resize", handleBodyOverflow);
    return () => {
      window.removeEventListener("resize", handleBodyOverflow);
    };
  }, [isOpen]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex flex-col space-y-4 overflow-auto bg-gray-800",
        {
          hidden: !isOpen,
          "lg:hidden": isOpen,
        },
      )}
    >
      <div className="flex flex-col gap-y-4 p-4">
        <span onClick={() => setIsOpen(!isOpen)} className="flex items-center">
          <Icon name="icon-[mdi--arrow-left] text-info mr-auto size-12 hover:bg-opacity-75" />
        </span>
        <h2 className="text-3xl text-gray-300">{title}</h2>
      </div>

      <div className="flex-grow">{children}</div>
    </div>
  );
};
