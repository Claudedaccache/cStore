import Footer from "../components/layoutComponents/Footer";
import Header from "../components/layoutComponents/Header";
import { Outlet } from "react-router-dom";
import BackToTop from "../components/ScrollTop";
import useStore from "../state/Store";
import { Stack } from "@mui/material";

const Layout = () => {
  const headerHeight = useStore((state) => state.headerHeight) + 20;

  return (
    <>
      <Header />
      <Stack mt={`${headerHeight}px`}>
        <Outlet />
      </Stack>
      <Footer />
      <BackToTop />
    </>
  );
};
export default Layout;
