import clsx from "clsx";
import { FaUser } from "react-icons/fa";
import {
  MdEmail,
  MdPassword,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { Button } from "../../../ui/button/Button.tsx";
import { Progress } from "../../progress/Progress";
import { Link } from "react-router-dom";

type SignupError = {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
};

type RegisterFormProps = {
  formValues: {
    username?: string;
    email?: string;
    country_id?: string;
    password?: string;
    repassword?: string;
  };
  handleOnChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  buttonStatus: string;
  clientErrors: {
    username?: string;
    email?: string;
    country_id?: string;
    password?: string;
    repassword?: string;
  };
  handleShowPassword: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => void;
  showPassword: {
    password: boolean;
    repassword: boolean;
  };
  signupErrors?: SignupError[] | undefined;
};

export const RegisterForm = ({
  formValues,
  handleOnChange,
  handleOnSubmit,
  buttonStatus,
  clientErrors,
  handleShowPassword,
  showPassword,
  signupErrors,
}: RegisterFormProps) => {

  return (
    <form className="w-96 space-y-2 rounded-md p-5" onSubmit={handleOnSubmit}>
      <div className="divider mb-6 divider-info opacity-75"></div>
      <Progress formValues={formValues} clientErrors={clientErrors} />
      {signupErrors?.map((err) => (
        <p
          key={err.value}
          className="text-center text-xs text-red-500 md:text-sm"
        >
          {err.msg}
        </p>
      ))}
      <label
        className={clsx(
          {
            "border-2 border-green-500":
              clientErrors?.username === "" && formValues.username.length >= 6,
            "border-2 border-red-500":
              clientErrors?.username ||
              signupErrors?.find((err) => err.path === "username"),
            border: clientErrors?.username === "",
          },
          "[:invalid]:border-2 input input-bordered flex items-center gap-2",
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
      {clientErrors?.username && (
        <p className="text-center text-xs text-red-500 md:text-sm">
          {clientErrors.username}
        </p>
      )}

      <label
        className={clsx(
          {
            "border-2 border-green-500":
              clientErrors?.email === "" && formValues.email.length >= 6,
            "border-2 border-red-500":
              clientErrors?.email ||
              signupErrors?.find((err) => err.path === "email"),
            border: clientErrors?.email === "",
          },
          "input input-bordered flex items-center gap-2",
        )}
      >
        <MdEmail className="size-4 opacity-70" />
        <input
          type="email"
          className="grow bg-transparent"
          placeholder="Correo Electrónico"
          name="email"
          value={formValues.email}
          onChange={handleOnChange}
          maxLength={150}
          pattern="^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$"
        />
      </label>
      {clientErrors?.email && (
        <p className="text-center text-xs text-red-500 md:text-sm">
          {clientErrors.email}
        </p>
      )}

      <select
        className="select select-bordered w-full valid:border-2 valid:border-green-500"
        name="country_id"
        value={formValues.country_id}
        onChange={handleOnChange}
        required
      >
        <option value="" disabled>
          Selecciona un país
        </option>
        <option value="1">Argentina</option>
        <option value="2">Brasil</option>
      </select>
      {clientErrors?.country_id && (
        <p className="text-center text-xs text-red-500 md:text-sm">
          {clientErrors.country_id}
        </p>
      )}

      <label
        className={clsx(
          {
            "border-2 border-green-500":
              !clientErrors?.password && formValues.password.length >= 6,
            "border-2 border-red-500": clientErrors?.password,
            border: clientErrors?.password === "",
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
      {clientErrors?.password && (
        <p className="text-center text-xs text-red-500 md:text-sm">
          {clientErrors.password}
        </p>
      )}

      <label
        className={clsx(
          {
            "border-2 border-green-500":
              !clientErrors?.repassword &&
              formValues.repassword === formValues.password &&
              formValues.repassword.length >= 6,
            "border-2 border-red-500": clientErrors?.repassword,
            border:
              clientErrors?.repassword === "" && formValues.password === "",
          },
          "input input-bordered flex items-center gap-2",
        )}
      >
        <MdPassword className="size-4 opacity-70" />
        <input
          type={showPassword.repassword ? "text" : "password"}
          className="grow bg-transparent"
          placeholder="Confirmar contraseña"
          name="repassword"
          value={formValues.repassword}
          onChange={handleOnChange}
          minLength={6}
          maxLength={20}
        />
        <span
          id="repassword"
          className="cursor-pointer"
          onClick={handleShowPassword}
        >
          {showPassword.repassword ? <MdVisibilityOff /> : <MdVisibility />}
        </span>
      </label>
      {clientErrors?.repassword && (
        <p className="text-center text-xs text-red-500 md:text-sm">
          {clientErrors.repassword}
        </p>
      )}

      <Button
        disabled={buttonStatus === "submitting" || buttonStatus === "disabled"}
        className="w-full text-white disabled:cursor-not-allowed disabled:bg-opacity-25 disabled:text-gray-400 disabled:hover:bg-info/25"
      >
        {buttonStatus === "submitting" ? "Enviando..." : "Registrarse"}
      </Button>
      <p className="text-center text-sm text-gray-300 md:text-base">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="text-info">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
};
