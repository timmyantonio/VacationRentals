import JobItem from "./jobItem";
import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  unit_id: {
    type: String,
  },
  reported_date: {
    type: String,
  },
  description: {
    type: String,
  },
  completion_date: {
    type: String,
  },
  severity: {
    type: String,
  },
  jobItems: [JobItem],
});

const Maintenance = mongoose.model("Maintenance", maintenanceSchema);
export default Maintenance;
