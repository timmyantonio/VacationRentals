import { createTheme } from "@mui/material/styles";

export const globalTheme = createTheme({
  typography: {
    fontFamily: [
      "Montserrat",
      "Abril Fatface",
      "Peralta",
      "Roboto",
      "Courier Prime",
    ].join(","),
  },
  palette: {
    primary: {
      main: "#1995AD",
    },
    secondary: {
      main: "#A1D6E2",
    },
  },
});
