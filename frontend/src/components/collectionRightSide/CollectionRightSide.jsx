import { Box, Stack, useTheme } from "@mui/material";
import CategoriesCheckboxes from "./CategoriesCheckboxes";
import TypeCheckboxes from "./TypeCheckboxes";
import SortSelect from "./SortSelect";
import Search from "./Search";
import useBreakpoint from "../../helpers/Breakpoints";
import CustomButton from "../../container/Button";
import { useFilterContext } from "../../context/filterContext";

const CollectionRightSide = () => {
  const theme = useTheme();
  const lowerThanMd = useBreakpoint("md", "lower");
  const {
    setSelectedCategories,
    setSelectedTypes,
    setSortValue,
    setSearchValue,
  } = useFilterContext();

  const handleSearchReset = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSortValue("Relevant");
    setSearchValue("");
  };

  return (
    <Stack width={{ xs: "100%", md: "25%" }} padding="2rem 1rem" gap={3}>
      <Search />
      {lowerThanMd ? (
        <Stack direction={{ xs: "column", sm: "row" }} gap={2} width="100%">
          <Box
            bgcolor={theme.palette.gray[10]}
            borderRadius="15px"
            p="1rem"
            width={{ xs: "100%", sm: "33.33%" }}
          >
            <CategoriesCheckboxes />
          </Box>

          <Box
            bgcolor={theme.palette.gray[10]}
            borderRadius="15px"
            p="1rem"
            width={{ xs: "100%", sm: "33.33%" }}
          >
            <TypeCheckboxes />
          </Box>

          <Box
            bgcolor={theme.palette.gray[10]}
            borderRadius="15px"
            p="1rem"
            width={{ xs: "100%", sm: "33.33%" }}
          >
            <SortSelect />
          </Box>
        </Stack>
      ) : (
        <>
          <Box bgcolor={theme.palette.gray[10]} borderRadius="15px" p="1rem">
            <CategoriesCheckboxes />
          </Box>
          <Box bgcolor={theme.palette.gray[10]} borderRadius="15px" p="1rem">
            <TypeCheckboxes />
          </Box>
          <Box bgcolor={theme.palette.gray[10]} borderRadius="15px" p="1rem">
            <SortSelect />
          </Box>
        </>
      )}
      <Stack alignItems="flex-end">
        <CustomButton
          variant="text"
          color="secondary"
          handleClick={handleSearchReset}
        >
          Reset
        </CustomButton>
      </Stack>
    </Stack>
  );
};

export default CollectionRightSide;
