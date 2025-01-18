import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RelatedProducts from "../components/RelatedProducts";
import ProductDescription from "../components/ProductDescription";
import { useShopContext } from "../context/shopContext";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { items } = useShopContext();

  useEffect(() => {
    const selectedProduct = [...items].find((elt) => elt._id === id);
    setProduct(selectedProduct);
  }, [id, items]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ProductDescription product={product} />

      <RelatedProducts product={product} />
    </>
  );
};

export default Product;
