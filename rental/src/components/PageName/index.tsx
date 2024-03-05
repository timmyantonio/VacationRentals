import { Box, Typography } from "@mui/material";

import React from "react";

function PageName({ label }: { label: string }) {
  return (
    <>
      {/* <Box
        sx={{
          border: `1px green solid`,
          borderRadius: 8,
          mx: "35%",
          bgcolor: "primary.light",
          color: "white",
        }}
      >
        <Typography letterSpacing={3} textAlign="center">
          {label}
        </Typography>
      </Box> */}
      <Typography letterSpacing={3} textAlign="center" variant="h6">
        {label}
      </Typography>
    </>
  );
}

export default PageName;
