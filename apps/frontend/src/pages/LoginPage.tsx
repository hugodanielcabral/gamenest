import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../components/auth/login/form/LoginForm.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import registerBG from "../assets/backgrounds/register-wallpaper.webp";
import gamenestLogo from "../assets/logos/gamenest-logo-1.webp";
import { useAuthForm } from "../hooks/useAuthForm.ts";

export const LoginPage = () => {
  const initialFormValue = {
    username: "",
    password: "",
  };

  const {
    formValues,
    handleOnChange,
    buttonStatus,
    setButtonStatus,
    setIsFormSubmitted,
  } = useAuthForm(initialFormValue);
  const [showPassword, setShowPassword] = useState({
    password: false,
    repassword: false,
  });

  const { signin, errors: signinErrors, setIsAuth } = useAuth();
  const navigate = useNavigate();

  const handleShowPassword = ({ currentTarget }) => {
    const { id } = currentTarget;

    setShowPassword({
      ...showPassword,
      [id]: !showPassword[id],
    });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonStatus("submitting");

    const signedInUser = await signin(formValues);

    if (!signedInUser) {
      setButtonStatus("error");
      return;
    }

    setIsFormSubmitted(true);
    setButtonStatus("disabled");
    navigate("/");
  };

  useEffect(() => {
    if (formValues.username !== "" && formValues.password !== "") {
      setButtonStatus("enabled");
    } else {
      setButtonStatus("disabled");
    }
  }, [formValues]);

  return (
    <div className="flex h-screen bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900">
      <aside className="relative hidden sm:w-[600px] md:block md:w-[700px] lg:w-[800px]">
        <img
          src={registerBG}
          alt="Register Background"
          className="h-full w-full object-cover brightness-75"
        />

        <div className="absolute bottom-8 left-0 right-0 top-0 flex flex-col items-center gap-y-2 p-5">
          <h2 className="mt-5 text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl">
            Bienvenido a <span className="font-semibold text-info">Game</span>
            <span className="font-semibold text-red-500">Nest</span>
          </h2>
          <p className="text-pretty text-sm text-gray-100 sm:text-base md:text-lg lg:text-xl">
            Inicia sesión para disfrutar de todas las funcionalidades de
            GameNest.
          </p>
        </div>
      </aside>
      <div className="flex w-full flex-col items-center justify-center">
        <Link to="/">
          <img
            src={gamenestLogo}
            alt="Gamenest Logo"
            className="w-32 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-95"
          />
        </Link>

        <LoginForm
          formValues={formValues}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          buttonStatus={buttonStatus}
          showPassword={showPassword}
          handleShowPassword={handleShowPassword}
          signinErrors={signinErrors}
        />
      </div>
    </div>
  );
};
