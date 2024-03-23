import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "../Menu";

function Header() {
  return (
    <>
      <Box textAlign="center" paddingX="20%" paddingBottom={5}>
        <Menu />
      </Box>
      <Box position="absolute" sx={{ right: 150, top: 25 }}>
        <Button
          disableRipple
          sx={{ textTransform: "none" }}
          endIcon={<LogoutIcon color="error" style={{ fontSize: 25 }} />}
        >
          <Typography
            color="white"
            fontWeight={800}
            letterSpacing={2}
            variant="subtitle2"
          >
            Logout
          </Typography>
        </Button>
      </Box>

      {/* <Box marginTop={1}>
        <Grid container>
          <Grid item sm={2}>
            <Box>
              <Button sx={{ py: 0, mt: 10 }} startIcon={<ArrowBackIcon />}>
                <Typography
                  fontWeight={800}
                  letterSpacing={2}
                  variant="subtitle2"
                >
                  Back
                </Typography>
              </Button>
            </Box>
          </Grid>
          <Grid item textAlign="center" sm={8}>
            <Menu />
          </Grid>
          <Grid textAlign="right" item sm={2}>
            <Box>
              <Button sx={{ py: 0, mt: 10 }} endIcon={<LoginIcon />}>
                <Typography
                  fontWeight={800}
                  letterSpacing={2}
                  variant="subtitle2"
                >
                  Login
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box> */}
    </>
  );
}

export default Header;
