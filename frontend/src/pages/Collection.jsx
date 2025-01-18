import FilterProvider from "../context/filterContext";

import CollectionContainer from "../components/collection/CollectionContainer";
import { useShopContext } from "../context/shopContext";

const Collection = () => {
  const { items } = useShopContext();

  return (
    <FilterProvider products={items}>
      <CollectionContainer />
    </FilterProvider>
  );
};

export default Collection;
