/* eslint-disable react/prop-types */
import {
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useShopContext } from "../../../context/shopContext";

const CartTotal = () => {
  const theme = useTheme();
  const { calculateTotal } = useShopContext();

  const currency = import.meta.env.VITE_CURRENCY || "€";

  const { subtotal, shipping, total } = calculateTotal;

  return (
    <>
      <Stack width={{ xs: "100%", md: "50%" }}>
        <Stack direction="row" gap={1} p="8px 16px" alignItems="center">
          <Typography variant="h4">Cart </Typography>
          <Typography variant="h4" color={theme.palette.secondary.main}>
            List
          </Typography>
        </Stack>
        <List>
          <ListItem>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Typography> SubTotal : </Typography>
              <Typography> {`${currency}${subtotal}`} </Typography>
            </Stack>
          </ListItem>

          <Divider variant="middle" flexItem />
          <ListItem>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Typography> Shipping Fees : </Typography>
              <Typography> {`${currency}${shipping}`} </Typography>
            </Stack>
          </ListItem>
          <Divider variant="middle" flexItem />
          <ListItem>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Typography> Total : </Typography>
              <Typography> {`${currency}${total}`} </Typography>
            </Stack>
          </ListItem>
        </List>
      </Stack>
    </>
  );
};

export default CartTotal;
