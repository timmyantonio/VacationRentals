import React, { useEffect } from "react";

import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  // useEffect(() => {
  //   location.
  // },[])
  return (
    <>
      <Typography variant="h3">Home page</Typography>
    </>
  );
}

export default Home;
