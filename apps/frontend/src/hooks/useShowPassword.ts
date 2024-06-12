import { useState } from "react";

type InitialStateType = {
  password: boolean;
  repassword?: boolean;
};

type handleOnPasswordVisibilityType = (pass: string) =>
    void;

export const useShowPassword = (
    initialState: InitialStateType
) => {

  const [showPasswords, setShowPasswords] = useState(initialState);

  const handleOnPasswordVisibility:handleOnPasswordVisibilityType = (pass) => {
    if (pass === "password")
      setShowPasswords({ ...showPasswords, password: !showPasswords.password });

    if (pass === "repassword")
      setShowPasswords({
        ...showPasswords,
        repassword: !showPasswords.repassword,
      });
  };

  return { handleOnPasswordVisibility, showPasswords };
};
