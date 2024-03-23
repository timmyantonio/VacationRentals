import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  
  withAc: {
    type: "Boolean",
  },
  withFridge: {
    type: "Boolean",
  },
  withTv: {
    type: "Boolean",
  },
});

const Feature = mongoose.model("Feature", featureSchema);
export default Feature;
