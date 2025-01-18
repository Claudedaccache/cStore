import {
  Box,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import isEmpty from "lodash/isEmpty";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import OrderCart from "./OrdersCart";
import { useShopContext } from "../../context/shopContext";

const OrdersList = () => {
  const theme = useTheme();

  const { orders } = useShopContext();

  const totalOrder = orders.reduce((orderAcc, order) => {
    const orderTotal = Object.keys(order.cartItems).length;
    return orderAcc + orderTotal;
  }, 0);

  return (
    <Stack width="100%">
      <Stack direction="row" gap={1} p="8px 16px" alignItems="center">
        <Typography variant="h4" color={theme.palette.secondary.main}>
          Orders List
        </Typography>
        <Typography>( {`${totalOrder} orders`})</Typography>
      </Stack>
      <List>
        {!isEmpty(orders) ? (
          orders.map((order) => (
            <ListItem key={order._id} disableGutters>
              <Box width="100%">
                <OrderCart {...order} onRemove={() => {}} />
                {order._id !== orders[orders.length - 1]._id && (
                  <Divider variant="middle" flexItem sx={{ my: 2 }} />
                )}
              </Box>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <Stack direction="row">
              <Typography pr={1}>No orders added Yet !! </Typography>
              <SentimentVeryDissatisfiedIcon color="secondary" />
            </Stack>
          </ListItem>
        )}
      </List>
    </Stack>
  );
};

export default OrdersList;
