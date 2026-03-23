import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fe2c55",
    },
    secondary: {
      main: "#25f4ee",
    },
    background: {
      default: "#000000",
      paper: "#121212",
    },
  },
});

export default theme;
