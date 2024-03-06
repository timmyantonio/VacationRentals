import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  guestId: String,
  unitId: String,
  type: {
    type: String,
    required: true,
    enum: ["online", "onsite"],
  },
  agentCode: Number,
  checkInDate: { required: true, type: Date, default: Date.now },
  checkOutDate: Date,
  numberOfAdults: Number,
  numberOfChildren: Number,
  payments: {
    type: [String],
    default: [],
  },
  addOns: {
    type: [
      {
        id: {
          required: true,
          type: String,
        },
        withShuttleService: {
          required: true,
          type: "Boolean",
        },
        extraBeds: {
          required: true,
          type: Number,
        },
        breakfast: {
          numberOfAdults: {
            required: true,
            type: Number,
          },
          numberOfChildren: {
            required: true,
            type: Number,
          },
        },
      },
    ],
    default: [],
  },
  isFullyPaid: Boolean,
  isCancelled: Boolean,
  amount: Number,
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
