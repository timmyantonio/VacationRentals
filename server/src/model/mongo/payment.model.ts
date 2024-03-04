import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  _id: String,
  bookingId: String,
  guestId: String,
  description: String,
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  paymentType: {
    type: String,
    required: true,
    enum: ["cash", "card"],
  },
  amount: Number,
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
