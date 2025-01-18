/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilterContext = () => useContext(FilterContext);

const FilterProvider = ({ children, products }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortValue, setSortValue] = useState("Relevant");
  const [searchValue, setSearchValue] = useState("");

  const value = {
    selectedCategories,
    setSelectedCategories,
    selectedTypes,
    setSelectedTypes,
    sortValue,
    setSortValue,
    searchValue,
    setSearchValue,
    products,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export default FilterProvider;
