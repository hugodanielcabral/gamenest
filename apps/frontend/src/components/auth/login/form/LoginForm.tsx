import clsx from "clsx";
import { FaUser } from "react-icons/fa";
import { MdPassword, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Button } from "../../../ui/button/Button.tsx";
import { Link } from "react-router-dom";

type SigninError = {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
};

type LoginFormProps = {
  formValues: {
    username?: string;
    password?: string;
  };
  handleOnChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  buttonStatus: string;
  handleShowPassword: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => void;
  showPassword: {
    password: boolean;
  };
  signinErrors?: SigninError[] | undefined;
};

export const LoginForm = ({
  formValues,
  handleOnChange,
  handleOnSubmit,
  buttonStatus,
  handleShowPassword,
  showPassword,
  signinErrors,
}: LoginFormProps) => {
  return (
    <form className="w-96 space-y-2 rounded-md p-5" onSubmit={handleOnSubmit}>
      <div className="divider mb-6 divider-info opacity-75"></div>
      {signinErrors && signinErrors?.length && (
        <p className="text-center text-xs text-red-500 md:text-sm">
          Nombre de usuario o contraseña inválidos.
        </p>
      )}
      <label
        className={clsx(
          {
            "border-2 border-error": signinErrors?.length,
          },
          "input input-bordered flex items-center gap-2",
        )}
      >
        <FaUser className="size-4 opacity-70" />
        <input
          type="text"
          className="peer grow bg-transparent"
          placeholder="Nombre de usuario"
          name="username"
          value={formValues.username}
          onChange={handleOnChange}
          pattern="^[A-Za-z0-9]+$"
          minLength={6}
          maxLength={30}
        />
      </label>

      <label
        className={clsx(
          {
            "border-2 border-error": signinErrors?.length,
          },
          "input input-bordered flex items-center gap-2",
        )}
      >
        <MdPassword className="size-4 opacity-70" />
        <input
          type={showPassword.password ? "text" : "password"}
          className="grow bg-transparent"
          placeholder="Contraseña"
          name="password"
          value={formValues.password}
          onChange={handleOnChange}
          minLength={6}
          maxLength={20}
          pattern="^[a-zA-Z0-9@_\-!¡]+$"
        />

        <span
          id="password"
          className="cursor-pointer"
          onClick={handleShowPassword}
        >
          {showPassword.password ? <MdVisibilityOff /> : <MdVisibility />}
        </span>
      </label>

      <Button
        disabled={buttonStatus === "submitting" || buttonStatus === "disabled"}
        className="w-full text-white disabled:cursor-not-allowed disabled:bg-opacity-25 disabled:text-gray-400 disabled:hover:bg-info/25 btn-outline disabled:opacity-50"
        variant="info"
      >
        {buttonStatus === "submitting" ? "Enviando..." : "Iniciar sesión"}
      </Button>
      <p className={clsx("text-center text-base text-gray-300 md:text-lg", {
        hidden: buttonStatus === "submitting",
        block: buttonStatus === "disabled",
      })}>
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="text-error underline">
          Registrate
        </Link>
      </p>
    </form>
  );
};
