import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFilterContext } from "../../context/filterContext";
import useBreakpoint from "../../helpers/Breakpoints";
import { CustomSortFormControl } from "./style";

const CategoriesCheckboxes = () => {
  const { selectedCategories, setSelectedCategories, products } =
    useFilterContext();
  const categories = [...new Set(products.map((product) => product.category))];
  const lowerThanMd = useBreakpoint("md", "lower");

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, name] : prev.filter((category) => category !== name)
    );
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedCategories(value);
  };

  return (
    <FormControl component="fieldset" variant="standard" sx={{ width: "100%" }}>
      <FormLabel
        component="legend"
        sx={{
          color: "text.primary",
          "&.Mui-focused": {
            color: "text.primary",
          },
        }}
      >
        Categories
      </FormLabel>
      {lowerThanMd ? (
        <CustomSortFormControl fullWidth>
          <Select
            multiple
            value={selectedCategories}
            onChange={handleSelectChange}
            renderValue={(selected) => selected.join(", ")}
            inputProps={{
              name: "Sort",
              id: "uncontrolled-native",
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiSelect-select": {
                borderBottom: "2px solid black",
                borderRadius: 0,
                paddingBottom: "0",
              },
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  sx={{
                    "&.Mui-checked": {
                      color: "secondary.main",
                    },
                  }}
                />
                {category}
              </MenuItem>
            ))}
          </Select>
        </CustomSortFormControl>
      ) : (
        <FormGroup>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onChange={handleChange}
                  name={category}
                  sx={{
                    "&.Mui-checked": {
                      color: "secondary.main",
                    },
                  }}
                />
              }
              label={category}
            />
          ))}
        </FormGroup>
      )}
      {/* <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={handleChange}
                name={category}
                sx={{
                  "&.Mui-checked": {
                    color: "secondary.main",
                  },
                }}
              />
            }
            label={category}
          />
        ))}
      </FormGroup> */}
    </FormControl>
  );
};

export default CategoriesCheckboxes;
