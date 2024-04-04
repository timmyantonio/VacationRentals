import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { Register } from "./Register";
import SearchIcon from "@mui/icons-material/Search";

export const GuestsPage = () => {
  const [selectedOption, setSelectedOption] = useState(1);

  const OnRegisterClick = () => {
    setSelectedOption(1);
  };
  const OnSearchClick = () => {
    setSelectedOption(2);
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
            onClick={OnRegisterClick}
            sx={{
              "&:hover": { color: "white", bgcolor: "primary.light" },
            }}
          >
            <Typography variant="body2">Register</Typography>
          </Button>
          <Button
            variant={selectedOption == 2 ? "contained" : "text"}
            onClick={OnSearchClick}
            sx={{
              "&:hover": { color: "white", bgcolor: "primary.light" },
            }}
          >
            <Typography variant="body2">Search</Typography>
          </Button>
        </ButtonGroup>
      </Box>
      {selectedOption == 1 && <Register />}
    </>
  );
};
