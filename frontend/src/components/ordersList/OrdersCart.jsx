/* eslint-disable react/prop-types */
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import ClampedText from "../../helpers/ClampedText";
import { format } from "date-fns";
import OnlineIcon from "../../container/OnlineIcon";
import CustomButton from "../../container/Button";
import { useShopContext } from "../../context/shopContext";
import LazyImage from "../../helpers/LazyImage";

const OrderCart = (order) => {
  const { cartItems, createdAt, orderstatus, shippingAddress, paymentMethod } =
    order;
  const theme = useTheme();
  const { items } = useShopContext();
  const formattedDate = format(new Date(createdAt), "EEE MMM dd yyyy");

  return (
    <Stack width="100%" gap={4}>
      {cartItems.map(({ productId, quantity, size }, index) => {
        const item = items.find((item) => item._id === productId);

        return (
          <>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              key={index}
              width="100%"
            >
              <Stack flexDirection="row" gap={2}>
                <Box
                  width="50px"
                  height="80px"
                  borderRadius="16px"
                  minWidth="fit-content"
                >
                  <LazyImage
                    src={item?.image[0]}
                    alt={""}
                    imgStyle={{
                      borderRadius: "8px",
                    }}
                  />
                </Box>
                <Stack gap={0.8}>
                  <ClampedText text={item?.name} lines={1} />
                  <Stack direction="row" gap={1.5}>
                    <Typography>
                      Price:
                      <Typography
                        component="span"
                        ml="0.3rem"
                        color="text.secondary"
                      >
                        {item?.onSolde ? item.soldedPrice : item?.price}
                      </Typography>
                    </Typography>
                    <Typography>
                      Quantity:
                      <Typography
                        component="span"
                        ml="0.3rem"
                        color="text.secondary"
                      >
                        {quantity}
                      </Typography>
                    </Typography>
                    <Typography>
                      Size:
                      <Typography
                        component="span"
                        ml="0.3rem"
                        color="text.secondary"
                      >
                        {size}
                      </Typography>
                    </Typography>
                  </Stack>
                  <Typography>
                    Date:
                    <Typography
                      component="span"
                      ml="0.3rem"
                      color="text.secondary"
                    >
                      {formattedDate}
                    </Typography>
                  </Typography>
                  <Typography>
                    Payment:
                    <Typography
                      component="span"
                      ml="0.3rem"
                      color="text.secondary"
                    >
                      {paymentMethod}
                    </Typography>
                  </Typography>
                  <Typography>
                    Shipping Address:
                    <Typography
                      component="span"
                      ml="0.3rem"
                      color="text.secondary"
                    >
                      {shippingAddress.address}, {shippingAddress.city},{" "}
                      {shippingAddress.postalCode}, {shippingAddress.country}
                    </Typography>
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  color={theme.palette.secondary.main}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <OnlineIcon sx={{ fontSize: 12, mr: 0.5 }} /> {orderstatus}
                </Typography>
                <CustomButton
                  onClick={() => {}}
                  sx={{
                    height: "fit-content",
                    padding: "4px 12px",
                    textTransform: "none",
                  }}
                >
                  Track Order
                </CustomButton>
              </Stack>
            </Stack>
            {index < order.cartItems.length - 1 && (
              <Divider
                orientation="horizontal"
                variant="middle"
                flexItem
                sx={{ my: 2 }}
              />
            )}
          </>
        );
      })}
    </Stack>
  );
};

export default OrderCart;
