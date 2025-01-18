/* eslint-disable react/prop-types */
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddItem from "../pages/AddItem";
import { useTabContext } from "../context/tabContext";
import ItemsList from "../pages/ItemsList";
import OrdersList from "../components/orders/ordersList";
import Messages from "../components/messages";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      sx={{ width: "100%" }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const HomeContainer = () => {
  const { tabValue, handleChange, tabs, setToken } = useTabContext();

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "auto",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabValue}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          width: "15%",
          position: "fixed",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {tabs.map((tab, i) => {
          return (
            <Tab
              key={i}
              label={tab}
              {...a11yProps(i)}
              sx={{
                wordBreak: "break",
                backgroundColor:
                  tabValue === i ? "rgba(0, 0, 0, 1)" : "inherit",
              }}
            />
          );
        })}
        <Tab
          key={"SignOut"}
          label={"SignOut"}
          onClick={handleLogout}
          sx={{
            backgroundColor: "inherit",
            color: "lightBlue",
            mt: "1rem",
            height: "fit-content",
          }}
        />
      </Tabs>
      <Box
        sx={{
          marginLeft: "15%",
          width: "85%",
          overflowY: "auto",
          height: "100vh",
          pb: "2rem",
        }}
      >
        <TabPanel value={tabValue} index={0}>
          <AddItem />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ItemsList />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <OrdersList />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Messages />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default HomeContainer;
