import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../components/auth/login/form/LoginForm.js";
import { useAuth } from "../context/AuthContext.tsx";
import { useEffect, useState } from "react";
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

  const { signin, errors: signinErrors } = useAuth();
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
    <div className="flex h-screen bg-gradient-to-b from-gray-800 from-0% to-base-300">
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
