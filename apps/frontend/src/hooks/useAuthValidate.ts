import { useState } from "react";

export const useAuthValidate = (formValues) => {
  const [clientErrors, setClientErrors] = useState<object | null>(null);

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

  return { clientErrors, validateAuth };
};
