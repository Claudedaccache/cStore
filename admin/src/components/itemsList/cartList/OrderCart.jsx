/* eslint-disable react/prop-types */
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import ClampedText from "../../../helpers/ClampedText";
import { useTabContext } from "../../../context/tabContext";
import Divider from "@mui/material/Divider";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";

const OrderCart = ({
  _id,
  image,
  name,
  sizes,
  onSolde,
  soldedPrice,
  category,
  subCategory,
  price,
}) => {
  const theme = useTheme();

  const { handleRemove, currency } = useTabContext();

  const sortedSizes = JSON.parse(sizes).sort((a, b) => {
    const sizeOrder = ["S", "M", "L", "XL"];
    return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
  });

  return (
    <Stack flexDirection="row" justifyContent="space-between" width="100%">
      <Stack flexDirection="row" gap={2} flex={1}>
        <Box width="80px" height="80px" borderRadius="16px">
          <img
            src={image[0]}
            alt=""
            width="100%"
            height="100%"
            style={{ borderRadius: "8px" }}
          />
        </Box>
        <Stack gap={0.8}>
          <ClampedText text={name} lines={1} />
          <Stack direction="row" gap={0.8}>
            <Typography>{category}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography>{subCategory}</Typography>
          </Stack>
          <Divider orientation="horizontal" flexItem />
          <Typography>{sortedSizes.join(" , ")}</Typography>
        </Stack>
      </Stack>
      <Stack alignItems="flex-end">
        <IconButton
          sx={{
            "&:hover": {
              animation: "shake 0.5s ease-in-out",
            },
            "@keyframes shake": {
              "0%": {
                transform: "translateX(0)",
              },
              "25%": {
                transform: "translateX(-5px)",
              },
              "50%": {
                transform: "translateY(5px)",
              },
              "75%": {
                transform: "translateX(-5px)",
              },
              "100%": {
                transform: "translateX(0)",
              },
            },
          }}
          onClick={() => handleRemove(_id)}
        >
          <DeleteOutlineSharpIcon />
        </IconButton>
        <Stack direction="row" gap={1}>
          {onSolde && (
            <Typography color={theme.palette.secondary.main}>
              {currency}
              {soldedPrice}
            </Typography>
          )}

          <Typography
            color={theme.palette.secondary.main}
            sx={{ ...(onSolde && { textDecoration: "line-through" }) }}
          >
            {currency}
            {price}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default OrderCart;
