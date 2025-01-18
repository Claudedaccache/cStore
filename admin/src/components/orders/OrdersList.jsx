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
import { useTabContext } from "../../context/tabContext";
import OrderCart from "./OrdersCart";

const OrdersList = () => {
  const theme = useTheme();

  const { orders } = useTabContext();

  return (
    <Stack width="100%">
      <Stack direction="row" gap={1} p="8px 16px" alignItems="center">
        <Typography variant="h4" color={theme.palette.secondary.main}>
          All Orders
        </Typography>
        <Typography>( {`${orders.length} orders`})</Typography>
      </Stack>
      <List>
        {!isEmpty(orders) ? (
          orders.map((order) => (
            <ListItem key={order._id} disableGutters>
              <Box width="100%">
                <OrderCart {...order} />
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
