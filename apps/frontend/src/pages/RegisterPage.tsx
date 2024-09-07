import { useState } from "react";
import { RegisterForm } from "../components/auth/register/form/RegisterForm";
import { useAuthForm } from "../hooks/useAuthForm";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Button } from "../components/ui/button/Button.tsx";
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

    const newUser = await signup(formValues);

    if (!newUser) {
      setButtonStatus("error");
      return;
    }

    setIsFormSubmitted(true);
    setButtonStatus("success");
    setFormValues(initialFormValue);
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-800 from-0% to-base-300">
      <div className="flex w-full flex-col items-center justify-center">
        <Link to="/">
          <img
            src={gamenestLogo}
            alt="Gamenest Logo"
            className="w-32 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-95"
          />
        </Link>
        {buttonStatus === "success" ? (
          <div className="mt-5 flex flex-col items-center gap-2">
            <h2 className="text-2xl font-bold text-success">
              ¡Registro exitoso!
            </h2>
            {/*  <p className="text-sm text-white">
              Por favor, revisa tu correo electrónico para confirmar tu cuenta.
            </p> */}

            <Button
              className="text-white"
              onClick={() => navigate("/login")}
              variant="info"
            >
              Iniciar sesión
            </Button>
          </div>
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
