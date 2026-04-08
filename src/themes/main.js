import { createTheme } from "@mui/material/styles";
import { arEG } from "@mui/material/locale";
import { arSD } from "@mui/material/locale";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: '"Tajawal", "Arial", sans-serif',
  },
  palette: {
    mode: "light",
    primary: {
      main: "#006766",
      light: "#0067662e",
    },
    secondary: {
      main: "#b38e5d",
      light: "#d4c19c",
    },
    background: {
      default: "#fdfdfd",
      paper: "#ffffff",
    },
    success: {
      main: "#2e7d32",
      light: "#e6f4ea",
    },
    action: {
      hover: "#f1f1f1",
    },
  },
    components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
  arEG,
},arSD);

const dark = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: '"Tajawal", "Arial", sans-serif',
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#00bfa5",
    },
    secondary: {
      main: "#ffd54f",
    },
    background: {
      default: "#121212", // fond global
      paper: "#1e1e1e",   // fond des cartes / appbar
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbbbbb",
    },
    success: {
      main: "#4caf50",
      light: "#2e7d32",
    },
    action: {
      hover: "#333333",
    },
  },
  arEG,
});

export { theme, dark };
