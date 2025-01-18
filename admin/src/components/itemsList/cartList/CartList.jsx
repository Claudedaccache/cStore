import {
  Box,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import OrderCart from "./OrderCart";

import isEmpty from "lodash/isEmpty";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useTabContext } from "../../../context/tabContext";

const CartList = () => {
  const theme = useTheme();

  const { items, handleRemove } = useTabContext();

  return (
    <Stack width="100%">
      <Stack direction="row" gap={1} p="8px 16px" alignItems="center">
        <Typography variant="h4">Cart </Typography>
        <Typography variant="h4" color={theme.palette.secondary.main}>
          List
        </Typography>
        <Typography>( {`${items.length} products`})</Typography>
      </Stack>
      <List>
        {!isEmpty(items) ? (
          items.map((product) => (
            <ListItem key={product._id} disableGutters>
              <Box width="100%">
                <OrderCart
                  {...product}
                  onRemove={() => handleRemove(product._id)}
                />
                {product._id !== items[items.length - 1]._id && (
                  <Divider variant="middle" flexItem sx={{ my: 2 }} />
                )}
              </Box>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <Stack direction="row">
              <Typography pr={1}>No products added Yet !! </Typography>
              <SentimentVeryDissatisfiedIcon color="secondary" />
            </Stack>
          </ListItem>
        )}
      </List>
    </Stack>
  );
};

export default CartList;
