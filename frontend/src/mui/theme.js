import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  typography: {
    h1: {
      fontFamily: "Inter",
      fontSize: "2.5rem",
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h2: {
      fontFamily: "Inter",
      fontSize: "2rem",
      "@media (max-width:600px)": {
        fontSize: "1.75rem",
      },
    },
    h3: {
      fontFamily: "Inter",
      fontSize: "1.75rem",
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    h4: {
      fontFamily: "Inter",
      fontSize: "1.5rem",
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    h5: {
      fontFamily: "Inter",
      fontSize: "1.25rem",
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },

    h6: {
      fontFamily: "Inter",
      fontSize: "1rem",
      "@media (max-width:600px)": {
        fontSize: "0.875rem",
      },
    },
  },
  palette: {
    primary: {
      main: "#f9f9f9",
    },
    primaryLight: {
      main: "#e3f7fa",
    },
    secondary: {
      main: "#43c2d1",
    },
    tertiary: {
      main: "#404040",
    },
    gray: {
      10: "#EEEEEE",
      20: "#A2A2A2",
      30: "#7B7B7B",
      50: "#585858",
      90: "#141414",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: "#1976d2",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#115293",
          },
        },
        containedSecondary: {
          backgroundColor: "#dc004e",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#115293",
          },
        },
        containedTertiary: {
          backgroundColor: "#43c2d1",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#115293",
          },
        },
        containedDark: {
          backgroundColor: "#404040",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#115293",
          },
        },
        containedgray: {
          backgroundColor: "#EEEEEE",
          color: "#7B7B7B",
          "&:hover": {
            backgroundColor: "#A2A2A2",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: "none ",
          color: "inherit",
        },
      },
    },
  },
});

export default theme;
