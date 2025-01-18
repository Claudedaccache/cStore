import OrderContainer from "../container/OrderContainer";
import Section from "../container/Section";
import { ShopContextProvider } from "../context/shopContext";

const PlaceOrder = () => {
  return (
    <Section>
      <ShopContextProvider>
        <OrderContainer />
      </ShopContextProvider>
    </Section>
  );
};

export default PlaceOrder;
