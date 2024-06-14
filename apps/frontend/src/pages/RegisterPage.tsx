import { useEffect, useState } from "react";
import { RegisterForm } from "../components/auth/register/form/RegisterForm";
import registerBG from "../assets/backgrounds/register-wallpaper.webp";

type FormValues = {
  username: string;
  email: string;
  country_id: string;
  password: string;
  repassword: string;
};

export const RegisterPage = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    username: "",
    email: "",
    country_id: "",
    password: "",
    repassword: "",
  });

  const [clientErrors, setClientErrors] = useState<object | null>(null);
  const [buttonStatus, setButtonStatus] = useState("disabled");
  const [showPassword, setShowPassword] = useState(
    {
      password: false,
      repassword: false,
    }
  );

  const validateAuth = (name: string, value: string) => {
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(.[a-zA-Z0-9]+)+$",
    );
    const usernameRegex = /^[A-Za-z0-9]+$/;

    const passwordRegex = new RegExp("^[a-zA-Z0-9@_!¡-]+$");

    let trimmedValue = value.trim();

    switch (name) {
      case "username":
        if (value === "") {
          setClientErrors({
            ...clientErrors,
            username: "",
          });

          return;
        }

        if (!usernameRegex.test(value)) {
          setClientErrors({
            ...clientErrors,
            username:
              "El nombre de usuario solo puede contener letras y números",
          });

          return;
        }

        if (trimmedValue.length < 6) {
          setClientErrors({
            ...clientErrors,
            username: "El nombre de usuario debe tener al menos 6 caracteres",
          });

          return;
        }

        if (trimmedValue.length > 30) {
          setClientErrors({
            username:
              "El nombre de usuario debe tener como máximo 30 caracteres",
          });

          return;
        }

        setClientErrors({
          ...clientErrors,
          username: "",
        });
        break;

      case "email":
        if (trimmedValue === "") {
          setClientErrors({
            ...clientErrors,
            email: "",
          });

          return;
        }

        if (!emailRegex.test(trimmedValue)) {
          setClientErrors({
            ...clientErrors,
            email: "El correo electrónico no es válido",
          });

          return;
        }

        if (trimmedValue.length > 150) {
          setClientErrors({
            ...clientErrors,
            email:
              "El correo electrónico debe tener como máximo 150 caracteres",
          });

          return;
        }

        setClientErrors({
          ...clientErrors,
          email: "",
        });

        break;

      case "country_id":
        if (trimmedValue === "") {
          setClientErrors({
            ...clientErrors,
            country_id: "Selecciona un país",
          });

          return;
        }

        setClientErrors({
          ...clientErrors,
          country_id: "",
        });

        break;

      case "password":
        if (value === "") {
          setClientErrors({ ...clientErrors, password: "" });

          return;
        }

        if (!passwordRegex.test(value)) {
          setClientErrors({
            ...clientErrors,
            password:
              "La contraseña solo puede tener letras, números, y símbolos(@, _, -, ! y ¡)",
          });

          return;
        }

        if (trimmedValue.length < 6) {
          setClientErrors({
            ...clientErrors,
            password: "La contraseña debe tener al menos 6 caracteres",
          });

          return;
        }

        if (trimmedValue.length > 20) {
          setClientErrors({
            ...clientErrors,
            password: "La contraseña debe tener como máximo 20 caracteres",
          });

          return;
        }

        setClientErrors({ ...clientErrors, password: "" });

        break;

      case "repassword":
        if (value === "") {
          setClientErrors({ ...clientErrors, repassword: "" });

          return;
        }

        if (value !== formValues.password) {
          setClientErrors({
            ...clientErrors,
            repassword: "Las contraseñas no coinciden",
          });

          return;
        }

        setClientErrors({ ...clientErrors, repassword: "" });

        break;

      default:
        break;
    }
  };

  const handleOnChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = target;

    validateAuth(name, value);

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
    setButtonStatus("Enviando...");
    setFormValues({
      username: "",
      email: "",
      country_id: "",
      password: "",
      repassword: "",
    });
    setTimeout(() => {
      setButtonStatus("Registrarse");
    }, 3000);
  };

  const handleShowPassword = ({ currentTarget }) => {
    const { id } = currentTarget;
  
    setShowPassword({
      ...showPassword,
      [id]: !showPassword[id],
    });
  };

  useEffect(() => {
    const { username, email, country_id, password, repassword } = formValues;

    if (
      username !== "" &&
      email !== "" &&
      country_id !== "" &&
      password !== "" &&
      repassword !== "" &&
      Object.values(clientErrors).every((error) => error === "")
    ) {
      setButtonStatus("Registrarse");
    } else {
      setButtonStatus("disabled");
    }
  }, [formValues]);

  return (
    <div className="flex h-screen bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900">
      <aside className="hidden sm:w-[500px] md:block md:w-[600px] lg:w-[900px]">
        <img src={registerBG} alt="Register Background" className="h-full" />
      </aside>
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="text-center text-base sm:text-lg md:text-xl lg:text-2xl">
          GameNest Logo Here
        </h1>
        <RegisterForm
          formValues={formValues}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          buttonStatus={buttonStatus}
          clientErrors={clientErrors}
          showPassword={showPassword}
          handleShowPassword={handleShowPassword}
        />
      </div>
    </div>
  );
};
