export const useFetchCollection = () => {
  const createCollection = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/api/collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          /*           Authorization: `Bearer ${localStorage.getItem("token")}`,
           */
        },
        body: JSON.stringify({
          title: formData.title,
          color: formData.color,
          description: formData.description,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { createCollection };
};
