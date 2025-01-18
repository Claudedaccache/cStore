import Grid from "@mui/material/Grid2";
import Product from "../card";
import { Stack, Typography } from "@mui/material";
import TitleContent from "../../container/titleContent";
import { useShopContext } from "../../context/shopContext";

const NewArrival = () => {
  const { items } = useShopContext();

  const newArrivalProducts = [...items]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  return (
    <TitleContent title={"New Arrival"} idRef={"newArrival"}>
      {newArrivalProducts.length ? (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {newArrivalProducts.map((product, index) => (
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

export default NewArrival;
