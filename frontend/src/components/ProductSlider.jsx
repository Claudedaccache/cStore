/* eslint-disable react/prop-types */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";
import { Stack } from "@mui/material";
import LazyImage from "../helpers/LazyImage";

const ProductSlider = ({ product }) => {
  return (
    <Stack sx={{ width: "240px", height: "320px" }}>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="imgCardsSwiper"
      >
        {product.image.map((img, i) => {
          return (
            <SwiperSlide key={i}>
              <LazyImage
                src={img}
                alt={""}
                height={250}
                imgStyle={{ objectFit: "fill", borderRadius: " 16px " }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Stack>
  );
};

export default ProductSlider;
