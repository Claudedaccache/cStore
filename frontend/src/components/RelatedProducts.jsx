/* eslint-disable react/prop-types */
import TitleContent from "../container/titleContent";
import Grid from "@mui/material/Grid2";
import Product from "../components/card";
import isEmpty from "lodash/isEmpty";
import Section from "../container/Section";
import { useParams } from "react-router-dom";
import { useShopContext } from "../context/shopContext";

const RelatedProducts = ({ product }) => {
  const { id } = useParams();
  const { items } = useShopContext();

  const { category, subCategory } = product;
  const relatedProducts = [...items]
    .filter(
      (product) =>
        product.subCategory === subCategory &&
        product.category === category &&
        product._id !== id
    )
    .slice(0, 5);

  if (isEmpty(relatedProducts)) {
    return null;
  }

  return (
    <Section>
      <TitleContent title={"Related Products"} titlePosition={"flex-start"}>
        {
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {relatedProducts.map((product, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 2.4 }}>
                <Product {...product} />
              </Grid>
            ))}
          </Grid>
        }
      </TitleContent>
    </Section>
  );
};

export default RelatedProducts;
