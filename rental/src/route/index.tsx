import { Routes as DomRoutes, Navigate, Route } from "react-router-dom";

import Bookings from "../pages/Bookings";
import { ErrorPage } from "../pages/Error";
import { GuestsPage } from "../pages/Guests";
import Home from "../pages/Home";
import Payments from "../pages/Payments";
import { SuccessPage } from "../pages/Success";
import { Test } from "../pages/test";
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
      <Route path={pathConfig.test} element={<Test />} />
      <Route path={pathConfig.payments} element={<Payments />} />
      <Route path={pathConfig.bookings} element={<Bookings />} />
      <Route path={pathConfig.success} element={<SuccessPage />} />
      <Route path={pathConfig.error} element={<ErrorPage />} />
      <Route path="*" element={<Navigate to={pathConfig.home} />} />
      <Route path={pathConfig.guests} element={<GuestsPage />} />
      <Route
        path={pathConfig.maintenance}
        element={<Typography variant="h3">Maintenance Page</Typography>}
      />
      <Route
        path={pathConfig.admin}
        element={
          <Typography textAlign="center" variant="h3">
            Admin Page
          </Typography>
        }
      />
    </DomRoutes>
  );
}

export default Routes;
