/* eslint-disable react/prop-types */
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import Counter from "./Counter";
import CloseIcon from "@mui/icons-material/Close";
import ClampedText from "../../../helpers/ClampedText";
import { useShopContext } from "../../../context/shopContext";
import { useEffect } from "react";
import LazyImage from "../../../helpers/LazyImage";

const OrderCart = ({
  _id,
  image,
  name,
  size,
  onSolde,
  soldedPrice,
  price,
  count,
}) => {
  const theme = useTheme();

  const {
    handleRemove,
    handleCountChange,
    currency,
    fetchCartData,
    cartItems,
  } = useShopContext();

  const handleCountUpdate = (newCount) => {
    handleCountChange(_id, size, newCount);
  };

  const handleCartRemove = () => {
    handleRemove(_id, size);
  };

  const totalPrice = `${currency}${
    parseInt(onSolde ? soldedPrice : price) * parseInt(count)
  }`;

  useEffect(() => {
    fetchCartData();
  }, [cartItems]);

  return (
    <Stack flexDirection="row" justifyContent="space-between" width="100%">
      <Stack flexDirection="row" gap={2}>
        <Box
          width="50px"
          height="80px"
          borderRadius="16px"
          minWidth="fit-content"
        >
          <LazyImage
            src={image[0]}
            alt={""}
            imgStyle={{
              borderRadius: "8px",
            }}
          />
        </Box>
        <Stack gap={0.8}>
          <ClampedText text={name} lines={1} />
          <Typography>{size}</Typography>
          <Counter
            count={count}
            onRemove={handleCartRemove}
            onCountChange={handleCountUpdate}
          />
        </Stack>
      </Stack>
      <Stack>
        <IconButton onClick={handleCartRemove}>
          <CloseIcon />
        </IconButton>
        <Typography color={theme.palette.secondary.main}>
          {totalPrice}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default OrderCart;
