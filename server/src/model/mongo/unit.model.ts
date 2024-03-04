import Feature from "./feature.model";
import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  description: {
    type: String,
  },
  unitNumber: {
    type: Number,
  },
  floorNumber: {
    type: Number,
  },
  features: [Feature],
  cost: {
    type: Number,
  },
  isOccupied: {
    type: "Boolean",
  },
});

const Unit = mongoose.model("Unit", unitSchema);
export default Unit;
