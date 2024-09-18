import { useState } from "react";

type FormState = {
  [key: string]: any;
};

export const useForm = <T extends FormState>(
  initialFormState: T,
  callback?: () => void,
) => {
  const [formState, setFormState] = useState<T>(initialFormState);

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });

    if (callback) {
      callback();
    }
  };

  return {
    formState,
    handleOnChange,
    setFormState,
  };
};
