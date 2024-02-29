import { useNavigate } from "react-router-dom";

export const CollectionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-3 my-5">
      <div className="w-[900px] mx-auto flex justify-between">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/collection/new")}
        >
          New collection
        </button>
        <div className="flex items-center gap-3">
          <div>View:</div>
          <div>Order by:</div>
        </div>
      </div>
      <article>
        <img
          src="https://placehold.co/600x400"
          alt=""
          className="mx-auto w-[900px] h-[300px] object-cover"
        />
      </article>
      <article>
        <img
          src="https://placehold.co/600x400"
          alt=""
          className="mx-auto w-[900px] h-[300px] object-cover"
        />
      </article>
      <article>
        <img
          src="https://placehold.co/600x400"
          alt=""
          className="mx-auto w-[900px] h-[300px] object-cover"
        />
      </article>
    </div>
  );
};
