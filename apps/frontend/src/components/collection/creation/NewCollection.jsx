import { useState } from "react";
import { useFetchCollection } from "../../../hooks/useFetchCollection";

export const NewCollection = () => {
  const { createCollection } = useFetchCollection();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    color: "White",
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCollection(formData);
  };

  return (
    <div className="mx-auto my-5 size-96">
      <h1 className="text-3xl">New Collection</h1>
      <form className="*:my-3" onSubmit={handleSubmit}>
        <label className="flex items-center gap-2 input input-lg input-bordered">
          Title
          <input
            type="text"
            className="grow"
            placeholder="My RPG games"
            value={formData.title}
            name="title"
            onChange={handleOnChange}
          />
        </label>
        <textarea
          className="textarea textarea-bordered textarea-lg"
          placeholder="Description"
          value={formData.description}
          name="description"
          onChange={handleOnChange}
        ></textarea>
        <select
          className="w-full max-w-xs select select-lg select-bordered"
          value={formData.color}
          name="color"
          onChange={handleOnChange}
        >
          <option disabled>Choose a background color</option>
          <option>White</option>
          <option>Black</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};
