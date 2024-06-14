import { useState } from "react";
import { RegisterForm } from "../components/auth/register/form/RegisterForm";
import { useAuthForm } from "../hooks/useAuthForm";
import registerBG from "../assets/backgrounds/register-wallpaper.webp";

export const RegisterPage = () => {
  const {
    formValues,
    handleOnChange,
    handleOnSubmit,
    clientErrors,
    buttonStatus,
  } = useAuthForm({
    username: "",
    email: "",
    country_id: "",
    password: "",
    repassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    repassword: false,
  });

  const handleShowPassword = ({ currentTarget }) => {
    const { id } = currentTarget;

    setShowPassword({
      ...showPassword,
      [id]: !showPassword[id],
    });
  };

  return (
    <div className="flex h-screen bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900">
      <aside className="hidden sm:w-[500px] md:block md:w-[600px] lg:w-[900px]">
        <img src={registerBG} alt="Register Background" className="h-full" />
      </aside>
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="text-center text-base sm:text-lg md:text-xl lg:text-2xl">
          GameNest Logo Here
        </h1>

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
          />
        )}
      </div>
    </div>
  );
};
