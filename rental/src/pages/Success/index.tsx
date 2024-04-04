import { Stack, Typography } from "@mui/material";

import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useLocation } from "react-router-dom";

export const SuccessPage = () => {
  const location = useLocation();
  return (
    <>
      <Stack marginTop={3} justifyContent="center" direction="row" spacing={2}>
        <ThumbUpIcon color="primary" style={{ fontSize: "50" }} />
        <Typography
          color="primary.main"
          paddingTop={1}
          letterSpacing={3}
          textAlign="center"
          variant="h4"
        >
          {location.state.message}
        </Typography>
      </Stack>
    </>
  );
};
