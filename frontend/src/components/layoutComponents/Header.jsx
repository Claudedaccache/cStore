import { AppBar, Box, Container, Toolbar } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import HeaderRightMenu from "./HeaderRightMenu";
import NavDrawer from "./NavDrawer";
import { useEffect, useRef } from "react";
import useStore from "../../state/Store";
import Logo from "../../container/Logo";

const Header = () => {
  const headerRef = useRef(null);
  const setHeaderHeight = useStore((state) => state.setHeaderHeight);

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      setHeaderHeight(height);
    }
  }, []);

  return (
    <AppBar>
      <Stack sx={{ flexGrow: 1 }} ref={headerRef}>
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <NavDrawer />
            {/* logo */}
            <Box>
              <Link to={"/"}>
                <Logo />
              </Link>
            </Box>
            {/* Navbar */}
            <Stack sx={{ display: { xs: "none", md: "flex" } }}>
              <Navbar />
            </Stack>
            <HeaderRightMenu />
          </Toolbar>
        </Container>
      </Stack>
    </AppBar>
  );
};

export default Header;
