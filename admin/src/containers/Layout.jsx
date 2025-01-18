import { Outlet } from "react-router-dom";
import BackToTop from "../components/ScrollTop";
import { Stack } from "@mui/material";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Stack sx={{ marginTop: "5rem" }}>
        <Outlet />
      </Stack>

      <BackToTop />
    </>
  );
};
export default Layout;
