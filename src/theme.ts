import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // light blue accent
    },
    secondary: {
      main: "#f48fb1", // pink accent
    },
    background: {
      default: "#121212", // dark background
      paper: "#1e1e1e",   // card backgrounds
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#444",
            },
            "&:hover fieldset": {
              borderColor: "#888",
            },
          },
        },
      },
    },
  },
});
