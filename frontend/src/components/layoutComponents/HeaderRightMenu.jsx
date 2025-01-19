import { Stack, Badge, Box, Menu, MenuItem, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ShoppingCartCheckoutSharpIcon from "@mui/icons-material/ShoppingCartCheckoutSharp";
import LocalMallSharpIcon from "@mui/icons-material/LocalMallSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { useShopContext } from "../../context/shopContext";

const HeaderRightMenu = () => {
  const [MoreAnchorEl, setMoreAnchorEl] = useState(null);
  const { token, setToken, cartItems } = useShopContext();
  const [totalCartQuantity, setTotalCartQuantity] = useState(
    localStorage.getItem("shopCartCount") || 0
  );

  const navigate = useNavigate();

  const getInitialsOrIcon = () => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (userProfile && userProfile.name && userProfile.lastname) {
      const firstInitial = userProfile.name.charAt(0).toUpperCase();
      const lastInitial = userProfile.lastname.charAt(0).toUpperCase();
      return `${firstInitial}${lastInitial}`;
    }

    return <AccountCircle />;
  };

  const isMobileMenuOpen = Boolean(MoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    token ? setMoreAnchorEl(event.currentTarget) : navigate("/login");
  };

  const handleMobileMenuClose = () => {
    setMoreAnchorEl(null);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("shopCartCount");
    navigate("/logIn");
  };

  useEffect(() => {
    const updateCartQuantity = () => {
      const total = localStorage.getItem("shopCartCount");
      setTotalCartQuantity(total ? parseInt(total) : 0);
    };

    updateCartQuantity();
    getInitialsOrIcon();

    const interval = setInterval(() => {
      updateCartQuantity();
      getInitialsOrIcon();
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (token) {
      const total = localStorage.getItem("shopCartCount");
      setTotalCartQuantity(total ? parseInt(total) : 0);
    }
  }, [cartItems, token]);

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={MoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate("/profile");
          handleMobileMenuClose();
        }}
      >
        <IconButton
          disableRipple={true}
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          <AccountCircle /> <Typography ml={1}>My Profile</Typography>
        </IconButton>
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/place-order");
          handleMobileMenuClose();
        }}
      >
        <IconButton
          disableRipple={true}
          size="large"
          aria-label={`show ${totalCartQuantity} new mails`}
        >
          <Badge
            badgeContent={totalCartQuantity}
            color="error"
            showZero
            max={999}
          >
            <ShoppingCartCheckoutSharpIcon />
          </Badge>
          <Typography ml={1}>Cart</Typography>
        </IconButton>
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/orders");
          handleMobileMenuClose();
        }}
      >
        <IconButton
          disableRipple={true}
          size="large"
          aria-label="show 4 new mails"
        >
          <LocalMallSharpIcon />

          <Typography ml={1}>Orders</Typography>
        </IconButton>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLogout();
          handleMobileMenuClose();
        }}
      >
        <IconButton
          disableRipple={true}
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          <LogoutSharpIcon /> <Typography ml={1}>Logout</Typography>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Stack
        sx={{
          display: "-webkit-inline-box",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          disableRipple={true}
          size="large"
          edge="start"
          aria-label="open drawer"
        >
          <Link to={"/collection"}>
            <SearchIcon sx={{ color: "black" }} />
          </Link>
        </IconButton>

        <Box sx={{ display: "flex" }}>
          {token && (
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Link to={"/place-order"}>
                <Badge
                  badgeContent={totalCartQuantity}
                  color="error"
                  showZero
                  max={999}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <ShoppingCartRoundedIcon />
                </Badge>
              </Link>
            </IconButton>
          )}

          <IconButton
            size="medium"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            {getInitialsOrIcon()}
          </IconButton>
        </Box>
      </Stack>
      {token && renderMobileMenu}
    </>
  );
};

export default HeaderRightMenu;
