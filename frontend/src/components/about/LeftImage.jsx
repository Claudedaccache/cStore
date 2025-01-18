import { Box } from "@mui/material";
import manImage from "../../assets/product_2.png";
import LazyImage from "../../helpers/LazyImage";

const LeftImage = () => {
  return (
    <Box height="100%" width="100%">
      <LazyImage
        src={manImage}
        alt={""}
        imgStyle={{
          borderRadius: "0 16px 16px 0",
          objectFit: "fill",
        }}
      />
    </Box>
  );
};

export default LeftImage;
