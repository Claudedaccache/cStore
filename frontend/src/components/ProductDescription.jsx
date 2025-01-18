/* eslint-disable react/prop-types */
import { Box, Stack } from "@mui/material";
import Section from "../container/Section";
import ProductSlider from "./ProductSlider";
import ProductDetails from "./ProductDetails";

const ProductDescription = ({ product }) => {
  return (
    <Section>
      <Stack direction={{ xs: "colum", md: "row" }} gap={3} width="100%">
        <Stack flex={1} alignItems="center" justifyContent="center">
          <ProductSlider product={product} />
        </Stack>
        <Box flex={1} alignItems="start" justifyContent="center">
          <ProductDetails product={product} />
        </Box>
      </Stack>
    </Section>
  );
};

export default ProductDescription;
