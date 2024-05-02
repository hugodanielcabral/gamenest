import { InputSearch } from "../../ui";
import { CollectionSearchSort } from "./sort/CollectionSearchSort";
import { CollectionSearchView } from "./view/CollectionSearchView";

export const CollectionSearch = () => {
  return (
    <section aria-label="Collection Search" className="col-span-4">
      <div className="flex items-center justify-center">
        <InputSearch
          name="search"
          placeholder="Search for a game..."
          className="border-t-info border-t-4 border-b-error border-b-4 round-md bg-base-200 focus:outline-none focus:ring-2 focus:ring-info focus:border-info focus:border-t-2 focus:border-b-2 transition-colors duration-500 p-2 mt-2 rounded-md w-2/4 md:w-full"
          /* onChange={handleOnChange}
          value={search} */
        />
        <CollectionSearchSort />
        <CollectionSearchView />
      </div>
    </section>
  );
};
