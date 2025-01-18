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
import { CustomSortFormControl } from "./style";
import useBreakpoint from "../../helpers/Breakpoints";

const TypeCheckboxes = () => {
  const { selectedTypes, setSelectedTypes, products } = useFilterContext();
  const types = [...new Set(products.map((product) => product.subCategory))];
  const lowerThanMd = useBreakpoint("md", "lower");

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setSelectedTypes((prev) =>
      checked ? [...prev, name] : prev.filter((type) => type !== name)
    );
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedTypes(value);
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
        Types
      </FormLabel>

      {lowerThanMd ? (
        <CustomSortFormControl fullWidth>
          <Select
            multiple
            value={selectedTypes}
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
            {types.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox
                  checked={selectedTypes.includes(category)}
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
          {types.map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={selectedTypes.includes(type)}
                  onChange={handleChange}
                  name={type}
                  sx={{
                    "&.Mui-checked": {
                      color: "secondary.main",
                    },
                  }}
                />
              }
              label={type}
            />
          ))}
        </FormGroup>
      )}
    </FormControl>
  );
};

export default TypeCheckboxes;
