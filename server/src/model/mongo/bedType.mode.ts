import mongoose from "mongoose";

const bedTypeSchema = new mongoose.Schema({
  size: {
    required: true,
    type: String,
  },
  isBunk: {
    required: true,
    type: "Boolean",
  },
});
const BedType = mongoose.model("BedType", bedTypeSchema);
export default BedType;
