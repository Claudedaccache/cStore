import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import InfoIcon from "@mui/icons-material/Info";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShieldIcon from "@mui/icons-material/Shield";

//Images
import manImage from "../assets/product_2.png";
import womanImage from "../assets/product_51.png";
import kidImage from "../assets/product_3.png";

export const NavItems = [
  { to: "/", label: "Home", icon: <HomeIcon /> },
  { to: "/collection", label: "Collection", icon: <InventoryIcon /> },
  { to: "/about", label: "About", icon: <InfoIcon /> },
  { to: "/contact", label: "Contact", icon: <AddIcCallIcon /> },
];

export const QuickLinks = [
  { to: "/about", label: "About us" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contacts" },
  { to: "/privacy", label: "Privacy Policy" },
];

export const address = [
  {
    icon: <CallIcon color="primary" />,
    text: "+1 (123) 456-7890",
    link: "tel:+1 (123) 456-7890",
  },
  {
    icon: <MailIcon color="primary" />,
    text: "support@Cstore.com",
    link: "mailto:support@Gstore.com",
  },
  {
    icon: <LocationOnIcon color="primary" />,
    text: "123 Cstore, suite 100, New York, NY",
    link: "",
  },
];

export const socialMedia = [
  { to: "https://www.facebook.com", icon: <FacebookIcon /> },
  { to: "https://www.x.com", icon: <XIcon /> },
  { to: "https://www.instagram.com", icon: <InstagramIcon /> },
  { to: "https://www.linkedin.com", icon: <LinkedInIcon /> },
];

export const BannerImages = [
  { alt: "https://www.facebook.com", img: manImage },
  { alt: "https://www.x.com", img: womanImage },
  { alt: "https://www.instagram.com", img: kidImage },
];

export const featureData = [
  {
    icon: <KeyboardReturnIcon color="success" />,
    title: "Easy return",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, molestiae!",
  },
  {
    icon: <LocalShippingIcon color="secondary" />,
    title: "Fast Delivery",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, molestiae!",
  },
  {
    icon: <ShieldIcon color="error" />,
    title: "Secure Payment",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, molestiae!",
  },
];
