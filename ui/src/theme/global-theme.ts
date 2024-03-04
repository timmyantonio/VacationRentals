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
      main: "#085A28",
    },
    secondary: {
      main: "#D19536",
    },
  },
});
