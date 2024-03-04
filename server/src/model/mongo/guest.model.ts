import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  _id: String,
  joinedDate: Date,
  name: {
    title: { required: true, type: String },
    forename: { required: true, type: String },
    surname: { required: true, type: String },
    middleName: String,
    suffix: String,
  },
  contact: {
    email: String,
    mobileNumber: {
      required: true,
      type: String,
    },
    telephoneNumber: String,
  },
});

const Guest = mongoose.model("Guest", guestSchema);
export default Guest;
