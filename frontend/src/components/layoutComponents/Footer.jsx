import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Section from "../../container/Section";
import { address, QuickLinks, socialMedia } from "../../data/StaticData";
import Logo from "../../container/Logo";

const Footer = () => {
  return (
    <Section marginTop="5rem">
      <Stack
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="start"
        justifyContent="space-between"
        bgcolor="black"
        color="#fff"
        borderRadius="16px 16px 0 0"
        padding="2rem"
        gap="3rem"
      >
        <Stack alignItems="flex-start">
          <Logo />
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias,
            rem.
          </Typography>
          <Typography>Copyright 2024 Cstore. All rights reserved</Typography>
        </Stack>
        <Stack>
          <Typography>Quick Links</Typography>
          <List>
            {QuickLinks.map(({ label, to }) => {
              return (
                <ListItem key={label} sx={{ paddingLeft: "0" }}>
                  <Link to={to}>{label}</Link>
                </ListItem>
              );
            })}
          </List>
        </Stack>
        <Stack>
          <Typography>Contact Us</Typography>
          <List>
            {address.map(({ link, icon, text }) => {
              return (
                <ListItem key={text} sx={{ paddingLeft: 0 }}>
                  {link ? (
                    <Link
                      to={link}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {icon}
                        <ListItemText primary={text} sx={{ marginLeft: 1 }} />
                      </Box>
                    </Link>
                  ) : (
                    <Stack direction="row" alignItems="center">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {icon}
                        <ListItemText primary={text} sx={{ marginLeft: 1 }} />
                      </Box>
                    </Stack>
                  )}
                </ListItem>
              );
            })}
          </List>
        </Stack>
        <Stack>
          <Typography>Follow Us</Typography>
          <List sx={{ display: "flex" }}>
            {socialMedia.map(({ to, icon }) => {
              return (
                <ListItem key={to} sx={{ paddingLeft: 0 }}>
                  <Link to={to} target="_blank" rel="noopener noreferrer">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {icon}
                    </Box>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Stack>
      </Stack>
    </Section>
  );
};

export default Footer;
