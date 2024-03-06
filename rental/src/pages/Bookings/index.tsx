import "react-datepicker/dist/react-datepicker.css";

import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import React, { useState } from "react";

import NewBooking from "./NewBooking";

function Bookings() {
  const [selectedOption, setSelectedOption] = useState(2);

  const OnNewClick = () => {
    setSelectedOption(1);
  };
  const OnActiveClick = () => {
    setSelectedOption(2);
  };
  const OnCompletedClick = () => {
    setSelectedOption(3);
  };
  return (
    <>
      <Box sx={{ textAlign: "center", px: "38%" }}>
        <ButtonGroup
          size="small"
          fullWidth
          disableElevation
          variant="text"
          disableRipple
        >
          <Button
            onClick={OnNewClick}
            sx={{
              bgcolor: `${selectedOption == 1 ? "#4AC2DA" : null}`,
              "&:hover": { bgcolor: "#4AC2DA", color: "white" },
            }}
          >
            <Typography
              color={selectedOption == 1 ? "white" : "primary.main"}
              variant="body2"
            >
              New
            </Typography>
          </Button>
          <Button
            onClick={OnActiveClick}
            sx={{
              bgcolor: `${selectedOption == 2 ? "#4AC2DA" : null}`,
              "&:hover": { bgcolor: "#4AC2DA", color: "white" },
            }}
          >
            <Typography
              color={selectedOption == 2 ? "white" : "primary.main"}
              variant="body2"
            >
              Active
            </Typography>
          </Button>
          <Button
            onClick={OnCompletedClick}
            sx={{
              bgcolor: `${selectedOption == 3 ? "#4AC2DA" : null}`,
              "&:hover": { bgcolor: "#4AC2DA", color: "white" },
            }}
          >
            <Typography
              color={selectedOption == 3 ? "white" : "primary.main"}
              variant="body2"
            >
              Completed
            </Typography>
          </Button>
        </ButtonGroup>
      </Box>
      <NewBooking />
    </>
  );
}

export default Bookings;
