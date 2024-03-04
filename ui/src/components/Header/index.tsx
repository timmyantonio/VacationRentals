import { Box, Divider, Typography } from "@mui/material";
import logo from "../../images/logo.png";
export default () => {
  return (
    <Box textAlign="center" width="100%">
      <Box
        component={"img"}
        src={logo}
        sx={{ position: "absolute", left: 1, top: 1 }}
      />
    </Box>
  );
};
