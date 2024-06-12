import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { RegisterForm } from "../components/auth/register/form/RegisterForm.jsx";
import { AuthCard } from "../components/auth/AuthCard.jsx";
import { BackgroundImage, Button } from "../components/ui/index.js";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/backgrounds/register-wallpaper.webp";
import { Layout } from "../components/layout/Layout.jsx";
import clsx from "clsx";
import { useFetch } from "../hooks/useFetch.ts";
import { useAuthValidate } from "../hooks/useAuthValidate.ts";
import { useShowPassword } from "../hooks/useShowPassword.ts";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const RegisterPage = () => {
  const { signup, errors } = useAuth();
  const {
    formData,
    handleOnChange,
    username,
    email,
    password,
    repassword,
    country_id,
    gender,
  } = useForm({
    username: "",
    email: "",
    country_id: "",
    password: "",
    repassword: "",
    gender: "",
  });
  const { data, isLoading: isCountryLoading } = useFetch(`${BASE_URL}/country`);
  const { handleOnValidate, registerErrors } = useAuthValidate();
  const { handleOnPasswordVisibility, showPasswords } = useShowPassword({
    password: false,
    repassword: false,
  });
  const navigate = useNavigate();

  const [hasUserBeenCreated, setHasUserCreated] = useState(false);
  const [status, setStatus] = useState("");

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      setStatus("submitting");

      const userData = await signup(formData);

      if (userData) {
        setHasUserCreated(true);

        setStatus("success");
        setTimeout(() => {
          setStatus("");
        }, 2000);

        return;
      }

      setStatus("error");
    } catch (error) {
      console.log(error);
      setStatus("");
    }
  };

  return (
    <Layout>
      <BackgroundImage backgroundImage={backgroundImage}>
        <div className="mt-5 flex items-center justify-evenly">
          <article className="mt-3 flex flex-col items-center">
            <h1 className="text-pretty text-center text-2xl font-bold uppercase text-error md:text-3xl lg:text-4xl">
              Tu aventura comienza aquí!
            </h1>
            <h3 className="md:lg mt-4 text-center text-base font-bold text-gray-300 lg:text-xl">
              Regístrate para comenzar tu viaje.
            </h3>
          </article>
        </div>

        <AuthCard
          title={hasUserBeenCreated ? "Exito! 🎉" : "Registro"}
          className={clsx(
            {
              "bg-base-300": !hasUserBeenCreated,
              "bg-success": hasUserBeenCreated,
            },
            "min-h-fit",
          )}
        >
          {hasUserBeenCreated ? (
            <div className="mt-5 flex flex-col items-center space-y-5">
              <p className="text-center text-xl text-gray-200">
                Tu cuenta ha sido creada exitosamente!
              </p>
              <p className="text-center text-lg font-bold text-white">
                Por favor verifica tu email para continuar.
              </p>
              <Button
                className="bg-white font-bold text-black hover:bg-white hover:bg-opacity-80"
                onClick={() => navigate("/login")}
              >
                Ya verifiqué mi email
              </Button>
            </div>
          ) : (
            <RegisterForm
              handleOnSubmit={handleOnSubmit}
              handleOnChange={handleOnChange}
              data={data}
              isCountryLoading={isCountryLoading}
              errors={errors}
              username={username}
              email={email}
              country_id={country_id}
              password={password}
              repassword={repassword}
              status={status}
              handleOnPasswordVisibility={handleOnPasswordVisibility}
              showPasswords={showPasswords}
              gender={gender}
              handleOnValidate={handleOnValidate}
              registerErrors={registerErrors}
            />
          )}
        </AuthCard>
      </BackgroundImage>
    </Layout>
  );
};
