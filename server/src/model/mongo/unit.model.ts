import Feature from "./feature.model";
import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  locationCode: String,
  registeredDate: Date,
  description: {
    type: String,
    required: true,
    enum: ["standard", "extra", "double"],
  },
  unitNumber: {
    type: Number,
    required: true,
  },
  floorNumber: {
    type: Number,
    required: true,
  },
  feature: {
    type: {
      withAc: {
        type: Boolean,
        required: true,
      },
      withFridge: {
        type: Boolean,
        required: true,
      },
      withTv: {
        type: Boolean,
        required: true,
      },
    },
    required: true,
  },
  status: {
    type: String,
    enum: ["booked", "occupied", "available"],
  },
});

const Unit = mongoose.model("Unit", unitSchema);
export default Unit;
