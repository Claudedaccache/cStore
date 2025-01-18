/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { deliveryFormSchema } from "../joy/validationSchema";
import { StyledTextField } from "../mui/customCss";
import { useShopContext } from "../context/shopContext";
import axios from "axios";
import { backend_url } from "../App";
import toast from "react-hot-toast";

const DeliveryForm = ({ formRef }) => {
  const {
    paymentFormData,
    setPaymentFormData,
    cartItems,
    token,
    calculateTotal,
    setCheckout,
    setNextStep,
    setCartItems,
  } = useShopContext();
  const { total } = calculateTotal;

  const [errors, setErrors] = useState({});

  const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
    backgroundColor: theme.palette.gray[10],
    color: theme.palette.gray[20],
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentFormData({ ...paymentFormData, [name]: value });
  };
  const handleKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };
  const handlePaymentMethodChange = (event, newPaymentMethod) => {
    if (newPaymentMethod !== null) {
      setPaymentFormData({
        ...paymentFormData,
        paymentMethod: newPaymentMethod,
      });
    }
  };

  const validate = () => {
    const { error } = deliveryFormSchema.validate(paymentFormData, {
      abortEarly: false,
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});

    if (errors) return;

    const orderDetails = {
      cartItems,
      paymentMethod: paymentFormData.paymentMethod,
      shippingAddress: {
        address: paymentFormData.address,
        city: paymentFormData.city,
        postalCode: paymentFormData.postalCode,
        country: paymentFormData.country,
      },
      total,
    };

    try {
      const response = await axios.post(
        `${backend_url}/api/orders/addOrders`,
        orderDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orderData = response.data;

      if (orderData.success) {
        toast.success("Order created successfully!  🎉");
        setCheckout(false), setNextStep(false), setCartItems({});
        localStorage.removeItem("shopCartCount");
      } else {
        toast.error("Error creating order , please try again later");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Delivery Information
      </Typography>
      <form ref={formRef} onSubmit={handleSubmit}>
        <StyledTextField
          label="Phone Number"
          name="phoneNumber"
          value={paymentFormData.phoneNumber}
          onChange={handleChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          fullWidth
          margin="normal"
          inputMode="numeric"
          pattern="[0-9]*"
          onKeyUp={handleKeyPress}
        />
        <StyledTextField
          label="Address"
          name="address"
          value={paymentFormData.address}
          onChange={handleChange}
          error={!!errors.address}
          helperText={errors.address}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="City"
          name="city"
          value={paymentFormData.city}
          onChange={handleChange}
          error={!!errors.city}
          helperText={errors.city}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Postal Code"
          name="postalCode"
          value={paymentFormData.postalCode}
          onChange={handleChange}
          error={!!errors.postalCode}
          helperText={errors.postalCode}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Country"
          name="country"
          value={paymentFormData.country}
          onChange={handleChange}
          error={!!errors.country}
          helperText={errors.country}
          fullWidth
          margin="normal"
        />

        <Box mt={2}>
          <Typography variant="h6" component="h2" gutterBottom>
            Payment Method
          </Typography>
          <ToggleButtonGroup
            value={paymentFormData.paymentMethod}
            exclusive
            onChange={handlePaymentMethodChange}
            aria-label="payment method"
          >
            <CustomToggleButton value="Stripe" aria-label="Stripe">
              Stripe
            </CustomToggleButton>
            <CustomToggleButton
              value="Cash on delivery"
              aria-label="cash on delivery"
            >
              Cash on Delivery
            </CustomToggleButton>
          </ToggleButtonGroup>
        </Box>
      </form>
    </>
  );
};

export default DeliveryForm;
