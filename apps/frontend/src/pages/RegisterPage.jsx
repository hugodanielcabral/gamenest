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
  const navigate = useNavigate();
  const { data, isLoading } = useFetch(`${BASE_URL}/country`);
  const [hasUserBeenCreated, setUserCreated] = useState(false);
  const [status, setStatus] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    repassword: false,
  });

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      setStatus("submitting");

      const userData = await signup(formData);

      if (userData) {
        setUserCreated(true);

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

  const handleOnPasswordVisibility = (pass) => {
    if (pass === "password")
      setShowPasswords({ ...showPasswords, password: !showPasswords.password });

    if (pass === "repassword")
      setShowPasswords({
        ...showPasswords,
        repassword: !showPasswords.repassword,
      });
  };

  return (
    <Layout>
      <BackgroundImage backgroundImage={backgroundImage}>
        <div className="flex items-center mt-5 justify-evenly">
          <article className="flex flex-col items-center mt-3">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-error uppercase text-pretty text-center">
              Tu aventura comienza aquí!
            </h1>
            <h3 className="mt-4 text-base md:lg lg:text-xl font-bold text-center text-gray-300">
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
            "min-h-fit"
          )}
        >
          {hasUserBeenCreated ? (
            <div className="flex flex-col items-center mt-5 space-y-5">
              <p className="text-center text-gray-200 text-xl">
                Tu cuenta ha sido creada exitosamente!
              </p>
              <p className="text-center text-white text-lg font-bold">
                Por favor verifica tu email para continuar.
              </p>
              <Button
                className="bg-white text-black font-bold hover:bg-opacity-80 hover:bg-white"
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
              isLoading={isLoading}
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
            />
          )}
        </AuthCard>
      </BackgroundImage>
    </Layout>
  );
};
