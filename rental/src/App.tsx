import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";

import Header from "./components/header/header";
import LoginIcon from "@mui/icons-material/Login";
import Routes from "./route";
import cover from "../src/assets/cover.png";

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          p: 3,
          backgroundImage: `url(${cover})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          width: "100%",
        }}
      >
        <Header />
        <Routes />
      </Box>
    </>
  );
}

export default App;
