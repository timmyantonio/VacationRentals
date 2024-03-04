import { Routes as DomRoutes, Navigate, Route } from "react-router-dom";

import Bookings from "../pages/Bookings";
import Home from "../pages/Home";
import Payments from "../pages/Payments";
import { Typography } from "@mui/material";
import pathConfig from "../route/config.json";

function Routes() {
  return (
    <DomRoutes>
      <Route
        path="/"
        element={<Navigate to={pathConfig.home} replace={true} />}
      />
      <Route path={pathConfig.home} element={<Home />} />
      <Route path={pathConfig.payments} element={<Payments />} />
      <Route path={pathConfig.bookings} element={<Bookings />} />
      <Route path="*" element={<Navigate to={pathConfig.home} />} />
      <Route
        path={pathConfig.guests}
        element={<Typography variant="h3">Guests Page</Typography>}
      />
      <Route
        path={pathConfig.maintenance}
        element={<Typography variant="h3">Maintenance Page</Typography>}
      />
      <Route
        path={pathConfig.admin}
        element={<Typography variant="h3">Admin Page</Typography>}
      />
    </DomRoutes>
  );
}

export default Routes;
