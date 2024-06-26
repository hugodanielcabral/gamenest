import { useState } from "react";
import { RegisterForm } from "../components/auth/register/form/RegisterForm";
import { useAuthForm } from "../hooks/useAuthForm";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import registerBG from "../assets/backgrounds/register-wallpaper.webp";
import gamenestLogo from "../assets/logos/gamenest-logo-1.webp";

export const RegisterPage = () => {
  const initialFormValue = {
    username: "",
    email: "",
    country_id: "",
    password: "",
    repassword: "",
  };

  const {
    formValues,
    handleOnChange,
    clientErrors,
    buttonStatus,
    setButtonStatus,
    setIsFormSubmitted,
    setFormValues,
  } = useAuthForm(initialFormValue);
  const [showPassword, setShowPassword] = useState({
    password: false,
    repassword: false,
  });

  const { signup, errors: signupErrors } = useAuth();

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

    const newUser = await signup(formValues);

    if (!newUser){
      setButtonStatus("error");
      return;
    } 

    setIsFormSubmitted(true);

    setTimeout(() => {
      setButtonStatus("success");
      setFormValues(initialFormValue);
    }, 2000);
  };

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
          <p className="text-pretty text-sm text-gray-300 sm:text-base md:text-lg lg:text-xl">
            Crea tu cuenta y empieza a disfrutar de todas las funcionalidades
            que te ofrecemos.
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
        {buttonStatus === "success" ? (
          <p className="text-green-500">Usuario registrado correctamente</p>
        ) : (

          <RegisterForm
            formValues={formValues}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
            buttonStatus={buttonStatus}
            clientErrors={clientErrors}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
            signupErrors={signupErrors}
          />
        )}
      </div>
    </div>
  );
};
