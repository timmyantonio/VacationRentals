import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import AdminIcon from "@mui/icons-material/AdminPanelSettings";
import BookingsIcon from "@mui/icons-material/ImportContacts";
import GuestsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import routeConfig from "../../route/config.json";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pathName, setPathName] = React.useState(location.pathname);

  React.useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);

  const OptionButton = ({
    label,
    path,
    icon,
  }: {
    label: string;
    path: string;
    icon: React.ReactNode;
  }) => {
    return (
      <Button
        startIcon={icon}
        onClick={() => navigate(path)}
        sx={{
          textTransform: "none",
          borderRadius: 8,
          borderColor: "white",
          color: "white",
          width: 200,
          "&:hover": {
            color: "white",
            border: "none",
          },
        }}
        variant={pathName == path ? "outlined" : "text"}
      >
        <Typography fontWeight={800} variant="subtitle2" letterSpacing={2}>
          {label}
        </Typography>
      </Button>
    );
  };
  return (
    <>
      <Box display="flex" justifyContent="space-evenly" flexWrap="wrap">
        <OptionButton
          icon={<HomeIcon />}
          path={routeConfig.home}
          label="Home"
        />
        <OptionButton
          icon={<BookingsIcon />}
          path={routeConfig.bookings}
          label="Bookings"
        />
        <OptionButton
          icon={<PaymentIcon />}
          path={routeConfig.payments}
          label="Payments"
        />
        <OptionButton
          icon={<GuestsIcon />}
          path={routeConfig.guests}
          label="Guests"
        />
        <OptionButton
          icon={<AdminIcon />}
          path={routeConfig.admin}
          label="Admin"
        />
      </Box>
    </>
  );
}
