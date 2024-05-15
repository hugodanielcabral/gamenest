import { useEffect, useState } from "react";
import { useUpdateUrlAndNavigate } from "./useUpdateUrlAndNavigate";

export const useMultiSelect = (initialState = {}) => {
  const { updateUrlAndNavigate } = useUpdateUrlAndNavigate();

  const [selectedOptions, setSelectedOptions] = useState(initialState);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    if (target.checked) {
      setSelectedOptions({
        ...selectedOptions,
        [name]: [...selectedOptions[name], value],
      });
      return;
    }

    setSelectedOptions({
      ...selectedOptions,
      [name]: selectedOptions[name].filter((option) => option !== value),
    });
  };

  useEffect(() => {
    updateUrlAndNavigate(selectedOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);

  return {
    ...selectedOptions,
    selectedOptions,
    handleOnChange,
    setSelectedOptions,
  };
};
