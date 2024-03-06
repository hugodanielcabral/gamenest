import { useState } from "react";
import { useFetchCollection } from "../../../hooks/useFetchCollection";
import backgroundImage from "../../../assets/backgrounds/collection-wallpaper.webp";
import { AuthCard } from "../../auth/AuthCard";

export const NewCollection = () => {
  const { createCollection } = useFetchCollection();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    color: "",
    category: "",
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
    <div
      className="p-4 min-h-[100vh] bg-no-repeat bg-cover bg-center bg-fixed bg-opacity-50 bg-blur-3xl bg-gradient-to-b from-base-100 to-base-300"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), url(${backgroundImage})`,
      }}
    >
      <AuthCard title="New Collection">
        <form className="*:my-3  mx-auto" onSubmit={handleSubmit}>
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
            <option value="" disabled selected>
              Select a background color
            </option>
            <option value="">White</option>
            <option value="">Black</option>
            <option value="">Red</option>
            <option value="">Blue</option>
          </select>
          <select
            className="w-full max-w-xs select select-lg select-bordered"
            value={formData.category}
            onChange={handleOnChange}
          >
            <option value="" disabled selected>
              Select a category
            </option>
            <option value="variety">Variety</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="strategy">Strategy</option>
            <option value="rpg">RPG</option>
            <option value="sports">Sports</option>
            <option value="simulation">Simulation</option>
            <option value="puzzle">Puzzle</option>
            <option value="racing">Racing</option>
            <option value="shooter">Shooter</option>
            <option value="platformer">Platformer</option>
            <option value="horror">Horror</option>
            <option value="survival">Survival</option>
            <option value="mmo">MMO</option>
            <option value="sandbox">Sandbox</option>
            <option value="fighting">Fighting</option>
            <option value="stealth">Stealth</option>
          </select>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </AuthCard>
    </div>
  );
};
