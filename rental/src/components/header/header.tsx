import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginIcon from "@mui/icons-material/Login";
import Menu from "../Menu";

function Header() {
  return (
    <>
      <Box marginTop={1}>
        <Grid container>
          <Grid item sm={2}>
            <Box>
              <Button sx={{ py: 0 }} startIcon={<ArrowBackIcon />}>
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
              <Button sx={{ py: 0 }} endIcon={<LoginIcon />}>
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
      </Box>
      <Divider sx={{ my: 3 }} />
    </>
  );
}

export default Header;
