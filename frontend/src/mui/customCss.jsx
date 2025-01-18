import { Box, styled, TextField, Typography } from "@mui/material";

export const textUnderline = (underlineWidth) => {
  return {
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-4px",
      right: "0",
      width: `${underlineWidth}px`,
      height: "3px",
      backgroundColor: "#43c2d1",
    },
  };
};

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.23)",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "gray",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(0, 0, 0, 0.54)",
  },
  "& .MuiOutlinedInput-input": {
    color: "black",
  },

  "& .MuiOutlinedInput-input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 100px #fff inset",
    WebkitTextFillColor: "#000",
  },
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(3),
}));

export const RegisterMessage = styled(Typography)(({ theme }) => ({
  marginY: theme.spacing(2),
  paddingTop: theme.spacing(2),
  "& a": {
    color: "green",
    paddingLeft: "4px",
    textDecoration: "underline",
  },
}));
