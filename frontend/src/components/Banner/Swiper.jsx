// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BannerImages } from "../../data/StaticData";
import LazyImage from "../../helpers/LazyImage";

export default function BannerSwiper() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {BannerImages.map(({ alt, img }) => {
          return (
            <SwiperSlide key={alt}>
              <LazyImage
                src={img}
                alt={alt}
                imgStyle={{
                  borderRadius: "0 16px 16px 0",
                  objectFit: "fill",
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
