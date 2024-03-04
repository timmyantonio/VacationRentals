import { Route, Routes as DomRoutes, Navigate } from "react-router-dom";

import pathConfig from "../route/config.json";
import Onboard from "../pages/Onboard";
import Admin from "../pages/Admin";
import AddUnit from "../pages/Admin/AddUnit";
function Routes() {
  return (
    <DomRoutes>
      <Route path="/" element={<Navigate to={pathConfig.admin} replace />} />

      <Route path={pathConfig.admin} element={<Admin />} />

      <Route path={pathConfig.onboard} element={<Onboard />} />

      <Route path={pathConfig.addUnit} element={<AddUnit />} />
    </DomRoutes>
  );
}

export default Routes;
