import { Select } from "../../../ui/select/Select";

export const CollectionSearchView = () => {
  return (
    <div className="basis-32 text-white">
      <Select id="sort" name="sort" defaultValue="">
        <option value="" disabled>
          Sort
        </option>
        <option value="rating">Rating</option>
        <option value="hours_played">Hours Played</option>
        <option value="title">Title</option>
      </Select>
    </div>
  );
};
