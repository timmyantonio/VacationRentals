import { Box, Container, CssBaseline } from "@mui/material";

import Header from "./components/header/header";
import Routes from "./route";
import cover from "../src/assets/cover.png";

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          px: 2,
          backgroundImage: `url(${cover})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          width: "100%",
        }}
      >
        <Box paddingTop={12} />
        <Header />
        <Routes />
      </Box>
    </>
  );
}

export default App;
