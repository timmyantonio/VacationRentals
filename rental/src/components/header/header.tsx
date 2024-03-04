import { Box, Button, Grid, Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginIcon from "@mui/icons-material/Login";
import Menu from "../Menu";
import React from "react";

function Header() {
  return (
    <>
      <Box>
        <Grid container>
          <Grid item sm={2}>
            <Box paddingLeft={1}>
              <ArrowBackIcon fontSize="large" />
            </Box>
          </Grid>
          <Grid item textAlign="center" sm={8}>
            <Menu />
          </Grid>
          <Grid textAlign="right" item sm={2}>
            <Box paddingRight={5}>
              <Button
                sx={{ py: 0 }}
                endIcon={<LoginIcon style={{ fontSize: 40 }} />}
              >
                <Typography letterSpacing={2} variant="h6">
                  Login
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Header;
