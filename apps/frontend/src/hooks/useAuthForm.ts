import React, { useEffect, useState } from "react";
import { useAuthValidate } from "./useAuthValidate";

type FormValues = {
  username?: string;
  email?: string;
  country_id?: string;
  password?: string;
  repassword?: string;
};

export const useAuthForm = (initialFormValue: FormValues) => {
  const [formValues, setFormValues] = useState(initialFormValue);
  const [buttonStatus, setButtonStatus] = useState("disabled");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const { validateAuth, clientErrors } =
    useAuthValidate(formValues);

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


  useEffect(() => {
    if (!isFormSubmitted) {
      const { username, email, country_id, password, repassword } = formValues;

      if (
        username !== "" &&
        email !== "" &&
        country_id !== "" &&
        password !== "" &&
        repassword !== "" &&
        Object.values(clientErrors).every((error) => error === "")
      ) {
        setButtonStatus("enabled");
      } else {
        setButtonStatus("disabled");
      }
    }
  }, [formValues, isFormSubmitted]);

  return {
    formValues,
    handleOnChange,
    clientErrors,
    buttonStatus,
    setButtonStatus,
    setIsFormSubmitted,
    setFormValues
  };
};
