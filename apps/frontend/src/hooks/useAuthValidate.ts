import { useState } from "react";
import { registerSchema } from "../validation/schemas/registerSchema";
import { fromZodError } from "zod-validation-error";

export const useAuthValidate = () => {
  const [registerErrors, setRegisterErrors] = useState(null);

  const handleOnValidate = ({ target }) => {
    const { name, value } = target;
    let result: string | any = "";
    result = registerSchema[name].safeParse(value);

    if (!result.success) {
      setRegisterErrors({
        ...registerErrors,
        [name]: fromZodError(result.error).message.replace(
          "Validation error: ",
          "",
        ),
      });
    } else {
      setRegisterErrors({
        ...registerErrors,
        [name]: null,
      });
    }
  };

  return { handleOnValidate, registerErrors };
};
