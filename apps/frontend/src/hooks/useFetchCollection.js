/* import { useState } from "react";

export const useFetchCollection = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [errors, setErrors] = useState(null);

  const createCollection = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/collection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: formData.title,
          color: formData.color,
          description: formData.description,
          category: formData.category,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors);
        throw new Error(data.errors ? data.errors[0].msg : "An error occurred");
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return { createCollection, errors };
};
 */
