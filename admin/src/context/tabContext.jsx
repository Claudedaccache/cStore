/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { products } from "../assets/data";
import { backend_url } from "../App";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

// Create the context
const TabContext = createContext();

// Custom hook to use the FilterContext
export const useTabContext = () => useContext(TabContext);

const TabProvider = ({ children, token, setToken }) => {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const tabs = ["Create Item", "Items List", "Orders", "contactUs Messages"];
  const [orderStatus, setOrderStatus] = useState(() =>
    orders.reduce((acc, order) => {
      acc[order._id] = "Order Placed";
      return acc;
    }, {})
  );
  const currency = import.meta.env.VITE_CURRENCY || "€";

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/product/list`);

      if (response.data.success) {
        setItems(response.data.products);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `${backend_url}/api/orders/allOrders`,
            { headers: { token } }
          );

          setOrders(response.data.orders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchOrders();
  }, [token]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${backend_url}/api/contactus/messages`
        );

        const data = response.data.messages;
        setMessages(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchMessages();
  }, []);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleRemove = async (id) => {
    try {
      const response = await axios.post(
        `${backend_url}/api/product/remove`,
        {
          id,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Item removed ");
        await fetchList();
      } else {
        toast.error(response.data.message);

        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${backend_url}/api/orders/updateOrderStatus`,
        { orderId: id, status: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        setOrderStatus((prev) => ({
          ...prev,
          [id]: newStatus,
        }));
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };

  const value = {
    tabValue,
    handleChange,
    handleStatusChange,
    orderStatus,
    tabs,
    products,
    handleRemove,
    items,
    orders,
    setOrders,
    fetchList,
    token,
    setToken,
    currency,
    messages,
  };

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};

export default TabProvider;
