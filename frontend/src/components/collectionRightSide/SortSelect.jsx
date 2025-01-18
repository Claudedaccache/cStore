import { InputLabel, NativeSelect } from "@mui/material";
import { CustomSortFormControl } from "./style";
import { useFilterContext } from "../../context/filterContext";

const SortSelect = () => {
  const { sortValue, setSortValue } = useFilterContext();

  const handleChange = (event) => {
    setSortValue(event.target.value);
  };

  return (
    <CustomSortFormControl fullWidth>
      <InputLabel
        variant="standard"
        htmlFor="uncontrolled-native"
        shrink={true}
        sx={{
          color: "text.primary",
          "&.Mui-focused": {
            color: "text.primary",
          },
        }}
      >
        Sort by:
      </InputLabel>
      <NativeSelect
        value={sortValue}
        onChange={handleChange}
        inputProps={{
          name: "Sort",
          id: "uncontrolled-native",
        }}
      >
        <option value={"relevant"}>Relevant</option>
        <option value={"low"}>Low</option>
        <option value={"high"}>High</option>
      </NativeSelect>
    </CustomSortFormControl>
  );
};

export default SortSelect;
