import { useFilterContext } from "../../context/filterContext";
import { SearchIconWrapper, SearchStyle, StyledInputBase } from "./style";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const { searchValue, setSearchValue } = useFilterContext();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <SearchStyle>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchValue}
        onChange={handleSearchChange}
      />
    </SearchStyle>
  );
};

export default Search;
