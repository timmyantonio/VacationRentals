import "react-datepicker/dist/react-datepicker.css";
import "../Bookings/payment-modal.css";

import { Box, Button, ButtonGroup, Divider, Typography } from "@mui/material";
import React, { useState } from "react";

import NewBooking from "./NewBooking";

function Bookings() {
  const [selectedOption, setSelectedOption] = useState(2);

  const OnNewClick = () => {
    setSelectedOption(1);
  };
  const OnPendingClick = () => {
    setSelectedOption(2);
  };
  const OnActiveClick = () => {
    setSelectedOption(3);
  };
  const OnCompletedClick = () => {
    setSelectedOption(4);
  };
  const OnCancelledClick = () => {
    setSelectedOption(5);
  };

  return (
    <>
      <Box sx={{ textAlign: "center", px: "30%" }}>
        <ButtonGroup
          size="small"
          fullWidth
          disableElevation
          variant="outlined"
          disableRipple
        >
          <Button
            variant={selectedOption == 1 ? "contained" : "text"}
            onClick={OnNewClick}
            sx={{
              "&:hover": { color: "white", bgcolor: "primary.light" },
            }}
          >
            <Typography variant="body2">New</Typography>
          </Button>
          <Button
            variant={selectedOption == 2 ? "contained" : "text"}
            onClick={OnPendingClick}
            sx={{
              "&:hover": { color: "white", bgcolor: "primary.light" },
            }}
          >
            <Typography variant="body2">Pending</Typography>
          </Button>
          <Button
            variant={selectedOption == 3 ? "contained" : "text"}
            onClick={OnActiveClick}
            sx={{
              "&:hover": { color: "white", bgcolor: "primary.light" },
            }}
          >
            <Typography variant="body2">Active</Typography>
          </Button>
          <Button
            variant={selectedOption == 4 ? "contained" : "text"}
            onClick={OnCompletedClick}
            sx={{
              "&:hover": { color: "white", bgcolor: "primary.light" },
            }}
          >
            <Typography variant="body2">Completed</Typography>
          </Button>
          <Button
            variant={selectedOption == 5 ? "contained" : "text"}
            onClick={OnCancelledClick}
            sx={{
              "&:hover": { color: "white", bgcolor: "primary.light" },
            }}
          >
            <Typography variant="body2">Cancelled</Typography>
          </Button>
        </ButtonGroup>
      </Box>
      <NewBooking />
    </>
  );
}

export default Bookings;
