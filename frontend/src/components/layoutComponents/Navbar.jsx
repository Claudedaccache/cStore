import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { NavItems } from "../../data/StaticData";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const [value, setValue] = useState(location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  const currentTab = NavItems.some((NavItem) => NavItem.to === value)
    ? value
    : false;

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        centered
      >
        {NavItems.map((NavItem) => {
          return (
            <Tab
              key={NavItem.label}
              label={NavItem.label}
              value={NavItem.to}
              component={Link}
              to={NavItem.to}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};
export default Navbar;
