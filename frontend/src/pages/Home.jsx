import { Stack } from "@mui/material";
import Banner from "../components/Banner/Banner";
import NewArrival from "../components/newArrival/NewArrival";
import PopularProducts from "../components/popularProducts/PopularProducts";
import Features from "../components/features/Features";

const Home = () => {
  return (
    <Stack>
      <Banner />
      <NewArrival />
      <PopularProducts />
      <Features />
    </Stack>
  );
};

export default Home;
