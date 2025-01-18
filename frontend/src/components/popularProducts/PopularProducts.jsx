import Grid from "@mui/material/Grid2";
import Product from "../card";
import { Stack, Typography } from "@mui/material";
import TitleContent from "../../container/titleContent";
import isEmpty from "lodash/isEmpty";
import { useShopContext } from "../../context/shopContext";

const PopularProducts = () => {
  const { items } = useShopContext();

  const popularProducts = [...items]
    .filter((product) => product.popular)
    .slice(0, 5);

  return (
    <TitleContent title={"Popular products"} idRef={"popularProducts"}>
      {!isEmpty(popularProducts) ? (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {popularProducts.map((product, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 2.4 }}>
              <Product {...product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack alignItems="center" justifyContent="center">
          <Typography>
            New Products are arriving veryy soon, Stay tuned !!!!
          </Typography>
        </Stack>
      )}
    </TitleContent>
  );
};

export default PopularProducts;
