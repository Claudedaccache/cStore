import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconButton, useTheme } from "@mui/material";
import { Fragment, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import { NavItems } from "../../data/StaticData";

export default function NavDrawer() {
  const [openDrawer, setOpenDrawer] = useState({ left: false });
  const location = useLocation();
  const theme = useTheme();
  const nagivate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer({ ...openDrawer, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {NavItems.map(({ to, label, icon }) => (
          <Box
            key={label}
            style={{
              backgroundColor:
                location.pathname === to ? theme.palette.gray[10] : "inherit",
              fontWeight: location.pathname === to ? "bold" : "normal",
            }}
          >
            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname === to}
                onClick={() => nagivate(to)}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      {["left"].map((anchor) => (
        <Fragment key={anchor}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-haspopup="true"
            onClick={toggleDrawer("left", true)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={"left"}
            open={openDrawer["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </Fragment>
      ))}
    </Box>
  );
}
