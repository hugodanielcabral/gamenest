import clsx from "clsx";
import { Button } from "../button/Button";
import { Icon } from "../icon/Icon";

export const Drawer = ({ children, isOpen, setIsOpen }) => {
  /* useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]); */

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex flex-col overflow-auto bg-gray-800",
        {
          hidden: !isOpen,
          "md:hidden": isOpen,
        },
      )}
    >
      <div className="flex justify-between items-center p-4">
        <h2 className="text-3xl text-gray-300">Filtros</h2>
        <Button
          className="btn-ghost text-4xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon name="icon-[material-symbols--close]" />
        </Button>
      </div>

      <div className="flex-grow p-4">{children}</div>
    </div>
  );
};
