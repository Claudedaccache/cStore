import TitleContent from "../../container/titleContent";
import Grid from "@mui/material/Grid2";
import Product from "../card";
import { Stack, Typography } from "@mui/material";
import { useFilterContext } from "../../context/filterContext";
import isEmpty from "lodash/isEmpty";

const CollectionProductList = () => {
  const {
    searchValue,
    selectedCategories,
    selectedTypes,
    sortValue,
    products,
  } = useFilterContext();

  const isFiltering =
    searchValue || !isEmpty(selectedTypes) || !isEmpty(selectedCategories);

  const filteredProducts = isFiltering
    ? [...products].filter((product) => {
        const matchesSearch =
          !searchValue ||
          (
            product.name.toLowerCase() || product.description.toLowerCase()
          ).includes(searchValue.toLowerCase());
        const matchesCategory =
          isEmpty(selectedCategories) ||
          selectedCategories.includes(product.category);
        const matchesType =
          isEmpty(selectedTypes) || selectedTypes.includes(product.subCategory);

        return matchesSearch && matchesCategory && matchesType;
      })
    : [...products];

  const sortProducts = (filteredProducts, sortedValue) => {
    switch (sortedValue) {
      case "high":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "low":
        return filteredProducts.sort((a, b) => a.price - b.price);
      default:
        return filteredProducts;
    }
  };
  const sortedProducts = sortProducts(filteredProducts, sortValue);

  if (isEmpty(products)) {
    return (
      <Stack alignItems="center" justifyContent="center">
        <Typography>Stay tuned !!!!</Typography>
      </Stack>
    );
  }

  return (
    <TitleContent
      title={"Collection Product List"}
      titlePosition={"flex-start"}
    >
      {!isEmpty(sortedProducts) ? (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {sortedProducts.map((product, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Product {...product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack alignItems="center" justifyContent="center">
          <Typography>Sorry no product found !!!!</Typography>
        </Stack>
      )}
    </TitleContent>
  );
};

export default CollectionProductList;
