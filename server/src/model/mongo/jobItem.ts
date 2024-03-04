import mongoose from "mongoose";

const jobItemSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  cost: {
    type: Number,
  },
  paidDate: {
    type: String,
  },
  invoiceNumber: {
    type: String,
  },
});

const JobItem = mongoose.model("JobItem", jobItemSchema);
export default JobItem;
