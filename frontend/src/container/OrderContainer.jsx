import { Box, Stack } from "@mui/material";
import CartList from "../components/orders/cartList/CartList";
import CartTotal from "../components/orders/cartTotal/CartTotal";
import { useRef } from "react";
import DeliveryForm from "../components/DeliveryInfo";
import Grid from "@mui/material/Grid2";
import CustomButton from "../container/Button";
import { useShopContext } from "../context/shopContext";
import { isEmpty } from "lodash";

const OrderContainer = () => {
  const formRef = useRef(null);
  const {
    checkout,
    paymentFormData,
    setCheckout,
    nextStep,
    setNextStep,
    cartItems,
  } = useShopContext();

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  const handleNextStepClick = () => {
    if (!isEmpty(cartItems)) {
      setNextStep(true);
      setCheckout(true);
    }
  };
  const handleBackClick = () => {
    setCheckout(false);
    setNextStep(false);
  };

  return (
    <Grid container spacing={2} direction={{ xs: "column-reverse", md: "row" }}>
      <Grid
        size={{
          xs: 12,
          md: nextStep && paymentFormData.paymentMethod === "Stripe" ? 6 : 12,
        }}
      >
        <Stack
          width="100%"
          gap={4}
          direction={{
            md:
              nextStep && paymentFormData.paymentMethod !== "Stripe"
                ? "row"
                : "column",
          }}
        >
          <Stack flex={1}>
            {nextStep ? <DeliveryForm formRef={formRef} /> : <CartList />}
          </Stack>
          <Stack flex={1}>
            <CartTotal />
            <Box>
              {!checkout && (
                <CustomButton
                  variant="contained"
                  color="success"
                  handleClick={handleNextStepClick}
                >
                  Next Step
                </CustomButton>
              )}
              {checkout && (
                <Stack direction="row" gap={1}>
                  <CustomButton
                    variant="contained"
                    color="primary"
                    handleClick={handleBackClick}
                  >
                    Back
                  </CustomButton>
                  <CustomButton
                    variant="contained"
                    color="success"
                    handleClick={handleExternalSubmit}
                    type="submit"
                  >
                    Pay
                  </CustomButton>
                </Stack>
              )}
            </Box>
          </Stack>
        </Stack>
      </Grid>
      {nextStep && paymentFormData.paymentMethod === "Stripe" && (
        <Grid size={{ xs: 12, md: 6 }}> hey </Grid>
      )}
    </Grid>
  );
};

export default OrderContainer;
