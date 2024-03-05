import { Box, Button, ButtonGroup, Typography } from "@mui/material";

import PageName from "../../components/PageName";
import React from "react";

function Bookings() {
  return (
    <>
      {/* <PageName label="Bookings page" /> */}
      <Box sx={{ textAlign: "center", px: "38%" }}>
        <ButtonGroup
          size="small"
          fullWidth
          disableElevation
          variant="text"
          disableRipple
        >
          <Button sx={{ "&:hover": { bgcolor: "#94d3ac", color: "white" } }}>
            <Typography>New</Typography>
          </Button>
          <Button sx={{ "&:hover": { bgcolor: "#94d3ac", color: "white" } }}>
            <Typography>Active</Typography>
          </Button>
          <Button sx={{ "&:hover": { bgcolor: "#94d3ac", color: "white" } }}>
            <Typography>Completed</Typography>
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
}

export default Bookings;
