import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  guest: {
    type: String,
    required: true,
    ref: "Guest",
  },
  unit: {
    type: String,
    required: true,
    ref: "Unit",
  },
  type: {
    type: String,
    required: true,
    enum: ["online", "onsite"],
  },
  agentCode: Number,
  bookingDate: { required: true, type: Date },
  startDate: { required: true, type: Date },
  endDate: { required: true, type: Date },
  numberOfDays: {
    type: Number,
    required: true,
    min: 1,
  },
  checkInDate: Date,
  checkOutDate: Date,
  numberOfAdults: {
    type: Number,
    required: true,
    min: 1,
  },
  numberOfChildren: Number,
  payments: {
    type: [String],
    default: [],
  },
  addOns: {
    type: [
      {
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
  isFullyPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  isCheckedIn: Boolean,
  status: {
    type: String,
    required: true,
    enum: ["pending", "active", "completed", "cancelled"],
  },
  amount: Number,
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
