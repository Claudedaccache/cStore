import OrdersList from "../components/ordersList/ordersList";
import Section from "../container/Section";
import { ShopContextProvider } from "../context/shopContext";

const Orders = () => {
  return (
    <Section>
      <ShopContextProvider>
        <OrdersList />
      </ShopContextProvider>
    </Section>
  );
};

export default Orders;
