import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
});

const LogoText = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.5rem",
  color: "#1976d2",
  marginLeft: "10px",
});

const LogoGraphic = styled("div")({
  width: "40px",
  height: "40px",
  backgroundColor: "#1976d2",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "1.5rem",
});

const Logo = () => {
  return (
    <LogoContainer>
      <LogoGraphic>C</LogoGraphic>
      <LogoText>store</LogoText>
    </LogoContainer>
  );
};

export default Logo;
