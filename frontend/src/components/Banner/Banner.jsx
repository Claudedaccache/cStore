import { Box, Stack, Typography, useTheme } from "@mui/material";
import Section from "../../container/Section";
import BannerSwiper from "./Swiper";
import useBreakpoint from "../../helpers/Breakpoints";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CustomButton from "../../container/Button";
import useStore from "../../state/Store";

const Banner = () => {
  const islargerThanMD = useBreakpoint("md", "up");
  const theme = useTheme();
  const headerHeight = useStore((state) => state.headerHeight);

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = headerHeight + 10;
      const elementPosition =
        section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Section>
      <Stack
        flexDirection="row"
        height={{ xs: "auto", md: "80vh" }}
        width="100%"
        bgcolor="lightgrey"
        borderRadius="16px"
        overflow="hidden"
      >
        <Stack
          flex={1.5}
          alignItems="start"
          justifyContent="center"
          borderRadius="16px 0 0 16px"
          p="2rem"
          gap="1rem"
        >
          <Stack flexDirection="row" alignItems="center" gap="0.5rem">
            <Typography variant="h6" color={theme.palette.secondary.main}>
              MODERN COLLECTION
            </Typography>
            <LocalFireDepartmentIcon color="warning" />
          </Stack>
          <Typography variant="h1" fontWeight="700">
            Elevate Your Look With <br /> Every Click Shop Today
          </Typography>
          <Box borderLeft="2px solid green" pl="10px">
            <Typography variant="h5" color={theme.palette.gray[30]}>
              Lorem, ipsum dolor sit amet consectetur adipisicing <br /> elit.
              Quod obcaecati dolor ad.
            </Typography>
          </Box>

          <Stack
            flexDirection={{ xs: "column", md: "row" }}
            gap="2rem"
            width="100%"
          >
            <CustomButton
              color="dark"
              variant="contained"
              handleClick={() => handleScroll("newArrival")}
            >
              Latest Products
            </CustomButton>
            <CustomButton
              color="tertiary"
              variant="contained"
              handleClick={() => handleScroll("popularProducts")}
            >
              Popular Products
            </CustomButton>
          </Stack>
        </Stack>
        {islargerThanMD && (
          <Stack flex={1} maxWidth="45%" borderRadius="0 16px 16px 0">
            <BannerSwiper />
          </Stack>
        )}
      </Stack>
    </Section>
  );
};

export default Banner;
