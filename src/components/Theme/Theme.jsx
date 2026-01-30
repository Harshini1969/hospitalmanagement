import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#006D77",
      light: "#4CB3BC",
      dark: "#004E52",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#83C5BE",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F8FAFA",
      paper: "#ffffff",
    },
    success: {
      main: "#2A9D8F",
    },
    warning: {
      main: "#E9C46A",
    },
    error: {
      main: "#E63946",
    },
    text: {
      primary: "#1F2937",
      secondary: "#4B5563",
    },
  },

  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "16px",
          borderRadius: 12,
          boxShadow: "rgba(0,0,0,0.05) 0px 2px 10px",
        },
      },
    },
  },
});

export default theme;