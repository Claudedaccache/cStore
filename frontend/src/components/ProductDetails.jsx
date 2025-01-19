/* eslint-disable react/prop-types */
import {
  Button,
  Divider,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import CustomButton from "../container/Button";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useShopContext } from "../context/shopContext";
import toast from "react-hot-toast";

const ProductDetails = ({ product }) => {
  const theme = useTheme();
  const {
    _id,
    name,
    description,
    price,
    soldedPrice,
    sizes,
    onSolde,
    raking = 4.8,
    reviews = 128,
  } = product;

  const [selectedSize, setSelectedSize] = useState("");

  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart, currency } = useShopContext();

  const sortedSizes = JSON.parse(sizes).sort((a, b) => {
    const sizeOrder = ["S", "M", "L", "XL"];
    return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
  });

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = (productId, productSize) => {
    if (productSize) {
      return addToCart(productId, productSize);
    } else {
      toast.error("You have to select a size to be able to add it ! 😔 ");
    }
  };

  return (
    <Stack>
      <Typography variant="h4" paddingBottom="0.5rem">
        {name}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        gap="1.5rem"
        paddingBottom="0.5rem"
      >
        <Stack direction="row" alignItems="center" gap="0.5rem">
          {onSolde && (
            <Typography
              variant="h5"
              color={theme.palette.secondary.main}
              fontWeight="700"
            >
              {currency}
              {soldedPrice}
            </Typography>
          )}
          <Typography
            sx={{ ...(onSolde && { textDecoration: "line-through" }) }}
          >
            {currency}
            {price}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" gap="0.5rem">
          {/* {raking && ( */}
          <Rating
            name="half-rating-read"
            defaultValue={raking}
            precision={0.5}
            readOnly
            sx={{ lineHeight: "initial" }}
          />
          {/* )} */}
          {/* {reviews &&  */}
          <Typography>({reviews})</Typography>
          {/* } */}
        </Stack>
      </Stack>
      <Typography
        variant="h6"
        paddingBottom="0.5rem"
        color={theme.palette.gray[30]}
      >
        {description}
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        gap="0.5rem"
        flexWrap="wrap"
        paddingBottom="0.8rem"
      >
        {sortedSizes.map((size) => {
          return (
            <Button
              key={size}
              onClick={() => handleSizeClick(size)}
              sx={{
                p: "0.1rem 0.4rem",
                border: "1px solid black",
                backgroundColor:
                  selectedSize === size ? "black" : "transparent",
                color: selectedSize === size ? "white" : "black",
              }}
            >
              {size}
            </Button>
          );
        })}
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        gap=".8rem"
        paddingBottom="0.5rem"
      >
        <CustomButton
          color="dark"
          variant="contained"
          handleClick={() => handleAddToCart(_id, selectedSize)}
          endIcon={<ShoppingCartRoundedIcon fontSize={"small"} />}
          sx={{ width: "50%" }}
        >
          Add to Cart
        </CustomButton>
        <CustomButton
          color="gray"
          variant="contained"
          handleClick={handleAddToFavorites}
          endIcon={
            isFavorite ? (
              <FavoriteIcon fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )
          }
        ></CustomButton>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        gap="0.5rem"
        paddingBottom="0.5rem"
      >
        <LocalShippingIcon />
        <Typography fontWeight="500">
          Free shipping on orders over 500$
        </Typography>
      </Stack>
      <Divider />
      <Stack paddingTop="0.5rem" color={theme.palette.gray[20]}>
        <Typography>Authenticity you can Trust</Typography>
        <Typography>Enjoy Cash on Delivery for your Convenience</Typography>
        <Typography>Easy Returns and Exchanges Within 7 Days</Typography>
      </Stack>
    </Stack>
  );
};

export default ProductDetails;
