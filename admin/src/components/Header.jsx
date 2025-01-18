import { AppBar, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../containers/Logo";

const Header = () => {
  return (
    <AppBar sx={{ bgcolor: "#fff" }}>
      <Box maxWidth="min-content" alignSelf="center">
        <Link to={"/"}>
          <Logo />
        </Link>
      </Box>
    </AppBar>
  );
};

export default Header;
