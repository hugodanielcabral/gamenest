import { Select } from "../../../ui/select/Select";

export const CollectionSearchSort = () => {
  return (
    <div className="basis-32 text-white">
      <Select id="view" name="view" defaultValue="">
        <option value="" disabled>
          View
        </option>
        <option value="grid">Grid</option>
        <option value="list">List</option>
      </Select>
    </div>
  );
};
