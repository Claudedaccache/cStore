/* eslint-disable react/prop-types */
// src/context/ThemeContext.js
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { backend_url } from "../App";
import { isEmpty } from "lodash";
import toast from "react-hot-toast";

const ShopContext = createContext();

export const useShopContext = () => useContext(ShopContext);

export const ShopContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [checkout, setCheckout] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [paymentFormData, setPaymentFormData] = useState({
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "Stripe",
  });
  const currency = import.meta.env.VITE_CURRENCY || "€";
  const delivery_Charge = 10;

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `${backend_url}/api/orders/userOrders`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setOrders(response.data.orders);
        } catch (error) {
          toast.error("Error fetching orders:", error);
        }
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);

    return () => clearInterval(interval);
  }, [token]);

  const fetchProductsData = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/product/list`);

      if (response.data.success) {
        setItems(response.data.products);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //fetch all user cart products
  const fetchCartData = async () => {
    try {
      if (!token) {
        toast.error("No token provided. Cannot fetch cart data.");
        return;
      }
      const response = await axios.get(`${backend_url}/api/cart/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        let cleanedCartData = {};

        Object.entries(response.data.cartData).forEach(([productId, sizes]) => {
          const validSizes = Object.entries(sizes).reduce(
            (acc, [size, quantity]) => {
              const validSizeKeys = ["S", "M", "L", "XL"];
              if (validSizeKeys.includes(size) && quantity > 0) {
                acc[size] = quantity;
              }
              return acc;
            },
            {}
          );

          if (Object.keys(validSizes).length > 0) {
            cleanedCartData[productId] = validSizes;
          }
        });

        if (JSON.stringify(cleanedCartData) !== JSON.stringify(cartItems)) {
          setCartItems(cleanedCartData);
        }
      } else {
        console.log("Error fetching cart:", response.data.message);
        setCartItems({});
      }
    } catch (error) {
      toast.error("Fetch cart error:", error.message);
    }
  };

  //add to user cart
  const addToCart = async (productId, size) => {
    try {
      const response = await axios.post(
        `${backend_url}/api/cart/add`,
        { id: productId, size },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Item added! 🎉");

        await fetchCartData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //remove from a user cart
  const removeFromCart = async (productId, size) => {
    try {
      const response = await axios.post(
        `${backend_url}/api/cart/update`,
        { id: productId, size, quantity: 0 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Item removed ! ");

        setCartItems((prevItems) => {
          const updatedItems = { ...prevItems };
          if (updatedItems[productId]) {
            delete updatedItems[productId][size];
            if (Object.keys(updatedItems[productId]).length === 0) {
              delete updatedItems[productId];
            }
          }

          return updatedItems;
        });

        await fetchCartData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCountChange = async (productId, size, newCount) => {
    if (newCount === 0) return; // Avoid sending a request when count is 0
    try {
      const response = await axios.post(
        `${backend_url}/api/cart/update`,
        { id: productId, size, quantity: newCount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setCartItems((prevItems) => ({
          ...prevItems,
          [productId]: { ...prevItems[productId], [size]: newCount },
        }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const calculateTotal = useMemo(() => {
    let subtotal = 0;

    Object.entries(cartItems).forEach(([productId, sizes]) => {
      const product = items.find((item) => item._id === productId);
      if (product) {
        // eslint-disable-next-line no-unused-vars
        Object.entries(sizes).forEach(([size, quantity]) => {
          const priceToUse =
            product.onSolde && product.soldedPrice
              ? product.soldedPrice
              : product.price;
          subtotal += priceToUse * quantity;
        });
      }
    });

    const shippingFee = !isEmpty(cartItems) ? delivery_Charge : 0;

    return {
      subtotal: subtotal,
      shipping: shippingFee,
      total: subtotal + shippingFee,
    };
  }, [cartItems, items]);

  useEffect(() => {
    fetchProductsData();
    if (token) {
      fetchCartData();
    }
  }, [token]);

  const calculateTotalQuantity = (cartItems) => {
    let totalQuantity = 0;

    // Calculate total quantity based on the cart items
    for (const sizes of Object.values(cartItems)) {
      totalQuantity += Object.keys(sizes).length;
    }
    return totalQuantity;
  };
  useEffect(() => {
    localStorage.setItem("shopCartCount", calculateTotalQuantity(cartItems));
  }, [cartItems]);

  const values = {
    items,
    setItems,
    orders,
    setOrders,
    cartItems,
    setCartItems,
    handleRemove: removeFromCart,
    handleCountChange,
    calculateTotal,
    token,
    setToken,
    checkout,
    setCheckout,
    nextStep,
    setNextStep,
    paymentFormData,
    setPaymentFormData,
    addToCart,
    fetchCartData,
    currency,
  };

  return <ShopContext.Provider value={values}>{children}</ShopContext.Provider>;
};
