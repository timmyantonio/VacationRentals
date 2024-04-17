import { Stack, Typography } from "@mui/material";

import React from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useLocation } from "react-router-dom";

export const ErrorPage = () => {
  const location = useLocation();
  return (
    <>
      <Stack marginTop={3} justifyContent="center" direction="row" spacing={2}>
        <ReportProblemIcon color="error" style={{ fontSize: "70" }} />
        <Typography
          color="error"
          paddingTop={1}
          letterSpacing={3}
          textAlign="center"
          variant="h3"
        >
          {location.state.message}
        </Typography>
      </Stack>
    </>
  );
};
