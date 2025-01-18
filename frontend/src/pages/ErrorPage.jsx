import { Container, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";

const Background = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  zIndex: -1,
  "&::before": {
    content: '"ERROR"',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "10rem",
    color: "#e0e0e0",
    opacity: 0.5,
  },
});

const ErrorPage = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Background>
      <Container style={{ textAlign: "center", zIndex: 1 }}>
        <Typography
          variant="h1"
          component="h2"
          sx={{ color: "green", fontSize: "8rem", fontFamily: "math" }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ fontFamily: "math" }}
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Go Back
        </Button>
      </Container>
    </Background>
  );
};

export default ErrorPage;
