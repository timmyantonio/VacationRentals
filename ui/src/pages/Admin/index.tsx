import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import pathUrl from "../../route/config.json";
import { useOneStore } from "../../store";

function Admin() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <Typography
        color="primary.main"
        letterSpacing={3}
        fontFamily="Montserrat"
        textAlign="center"
        variant="h3"
        marginBottom={2}
      >
        Admin
      </Typography>
      <Box
        sx={{
          p: 8,
          borderRadius: 10,
          border: `${theme.palette.primary.main} solid 1px`,
        }}
      >
        <Button
          onClick={() => navigate(pathUrl.addUnit)}
          variant="outlined"
          disableRipple
          sx={{
            borderRadius: 8,
            minWidth: 300,
            minHeight: 50,
            border: "light solid",
            ":hover": {
              bgcolor: "primary.light",
              color: "white",
            },
          }}
        >
          <Typography letterSpacing={2} fontFamily="Montserrat" variant="body1">
            Add Unit
          </Typography>
        </Button>
      </Box>
    </>
  );
}

export default Admin;
