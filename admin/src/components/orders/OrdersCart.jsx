/* eslint-disable react/prop-types */
import {
  Stack,
  Typography,
  useTheme,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useTabContext } from "../../context/tabContext";
import ClampedText from "../../helpers/ClampedText";
import { format } from "date-fns";
import LocalShippingSharpIcon from "@mui/icons-material/LocalShippingSharp";

const OrderCart = (order) => {
  const {
    _id,
    cartItems,
    createdAt,
    user,
    total,
    shippingAddress,
    paymentMethod,
  } = order;

  const theme = useTheme();

  const { handleStatusChange, orderStatus, items, currency } = useTabContext();

  const formattedDate = format(new Date(createdAt), "EEE MMM dd yyyy");

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="flex-start"
      width="100%"
      gap={2}
    >
      <Stack flex={0.2}>
        <LocalShippingSharpIcon />
      </Stack>
      <Stack flexDirection="row" gap={2} flex={1}>
        <Stack gap={1}>
          {cartItems.map(({ productId, quantity, size }, index) => {
            const item = items.find((item) => item._id === productId);
            if (!item) return;

            return (
              <Stack
                direction="row"
                gap={0.5}
                alignItems="baseline"
                key={index}
              >
                Items:{" "}
                <ClampedText
                  text={item.name}
                  textSx={{ maxWidth: "55%" }}
                  lines={1}
                />
                {` x ${quantity}`} {` - "${size}"`}
              </Stack>
            );
          })}
          <Stack gap={0.8}>
            <Typography>
              Name:
              <Typography component="span" ml="0.3rem" color="text.secondary">
                {user?.name} {user?.lastname} {user ? "" : "No name"}
              </Typography>
            </Typography>

            <Typography>
              Address:
              <Typography component="span" ml="0.3rem" color="text.secondary">
                {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack flex={0.8}>
        <Typography>
          Items:
          <Typography component="span" ml="0.3rem" color="text.secondary">
            {cartItems.length}
          </Typography>
        </Typography>

        <Typography>
          Payment method:
          <Typography component="span" ml="0.3rem" color="text.secondary">
            {paymentMethod}
          </Typography>
        </Typography>
        <Typography>
          Payment :
          <Typography component="span" ml="0.3rem" color="text.secondary">
            {"Done"}
          </Typography>
        </Typography>
        <Typography>
          Date:
          <Typography component="span" ml="0.3rem" color="text.secondary">
            {formattedDate}
          </Typography>
        </Typography>
      </Stack>
      <Stack flex={0.2}>
        <Typography
          color={theme.palette.secondary.main}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {`${currency}${total}`}
        </Typography>
      </Stack>
      <Stack>
        <FormControl fullWidth>
          <Select
            labelId={`order-status-label-${_id}`}
            value={orderStatus[_id] || "Order Placed"}
            onChange={(e) => handleStatusChange(_id, e.target.value)}
            size="small"
          >
            <MenuItem value="Order Placed">Order Placed</MenuItem>
            <MenuItem value="Packing">Packing</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default OrderCart;
