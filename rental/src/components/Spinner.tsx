import { Box, Modal, Typography, useTheme } from "@mui/material";

import { Bars } from "react-loader-spinner";
import React from "react";

function Spinner() {
  const theme = useTheme();
  const style = {
    position: "absolute",
    outline: "none",
    top: "48%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 5,
    p: 10,
    border: `5px ${theme.palette.primary.main} solid`,
    borderRadius: 5,
  };
  return (
    <Modal open={true}>
      <Box
        position="absolute"
        sx={style}
        display={"flex"}
        alignItems={"center"}
        flexDirection="column"
      >
        <Typography letterSpacing={4} variant="h3">
          Loading...
        </Typography>
        <Bars
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="audio-loading"
          visible={true}
        />
      </Box>
    </Modal>
  );
}

export default Spinner;
