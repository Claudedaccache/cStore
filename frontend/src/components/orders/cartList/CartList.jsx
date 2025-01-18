import {
  Box,
  Divider,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import OrderCart from "./orderCart";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useShopContext } from "../../../context/shopContext";
import { useEffect, useState } from "react";

const CartList = () => {
  const theme = useTheme();
  const [totalCartQuantity, setTotalCartQuantity] = useState(
    localStorage.getItem("shopCartCount") || 0
  );

  const { items, token, cartItems } = useShopContext();

  const cartItemKeys = Object.keys(cartItems);

  useEffect(() => {
    const updateCartQuantity = () => {
      const total = localStorage.getItem("shopCartCount");
      setTotalCartQuantity(total ? parseInt(total) : 0);
    };

    updateCartQuantity();

    const interval = setInterval(() => {
      updateCartQuantity();
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (token) {
      const total = localStorage.getItem("shopCartCount");
      setTotalCartQuantity(total ? parseInt(total) : 0);
    }
  }, [cartItems, token]);

  return (
    <Stack>
      <Stack direction="row" gap={1} p="8px 16px" alignItems="center">
        <Typography variant="h4">Cart </Typography>
        <Typography variant="h4" color={theme.palette.secondary.main}>
          List
        </Typography>
        <Typography>( {`${totalCartQuantity} items`} )</Typography>{" "}
      </Stack>
      {cartItemKeys.length === 0 ? (
        <ListItem>
          <Stack direction="row">
            <Typography pr={1}>No Items added Yet!! </Typography>
            <SentimentVeryDissatisfiedIcon color="secondary" />
          </Stack>
        </ListItem>
      ) : (
        cartItemKeys.map((productId, index) => {
          const product = items.find((item) => item._id === productId);
          if (!product) return null;

          const sizes = cartItems[productId];

          return Object.keys(sizes).map((size) => (
            <ListItem key={`${productId}-${size}`} disableGutters>
              <Box width="100%">
                <OrderCart {...product} size={size} count={sizes[size]} />
                {index !== sizes.length - 1 && (
                  <Divider variant="middle" flexItem sx={{ my: 2 }} />
                )}
              </Box>
            </ListItem>
          ));
        })
      )}
    </Stack>
  );
};

export default CartList;
