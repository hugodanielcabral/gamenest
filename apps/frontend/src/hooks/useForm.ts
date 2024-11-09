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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | React.FormEvent<HTMLSelectElement>,
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    setFormState({
      ...formState,
      [target.name]: target.value,
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
