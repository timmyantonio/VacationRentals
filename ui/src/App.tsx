import { Container, Typography, Box, Paper, Button } from "@mui/material";
import Menu from "./components/Menu";
import Header from "./components/Header";
import bg from "./images/bg.svg";

import Routes from "./route";
import { useOneStore } from "./store";
import { useEffect } from "react";
function App() {
  const setFirstname = useOneStore((state) => state.setFirstname);

  useEffect(() => {
    setFirstname("Melody");
  }, []);
  return (
    <>
      <Header />
      <Container>
        <Menu />
      </Container>

      {/* <Box
        sx={{
          position: "absolute",
          mb: 5,
          zIndex: -3,
          backgroundImage: `url(${bg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "98.4vw",
          minHeight: "100%",
          opacity: 0.3,
        }}
      /> */}
      <Container sx={{ my: 8 }}>
        <Routes />
      </Container>
    </>
  );
}

export default App;
