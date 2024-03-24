import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formData, setFormData] = useState(initialForm);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return { ...formData, formData, setFormData, handleOnChange };
};
