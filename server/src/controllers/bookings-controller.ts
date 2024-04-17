import { NextFunction, Request, Response } from "express";
import mongoose, { ClientSession } from "mongoose";

import Booking from "../model/mongo/booking.model";
import { HttpError } from "../model/http-error";
import { IBooking } from "../types";
import Unit from "../model/mongo/unit.model";
import assert from "assert";
import { nanoid } from "nanoid";
import { validationResult } from "express-validator";

export const addBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body as IBooking;
  let newBooking;

  const session: ClientSession = await mongoose.startSession();

  session.startTransaction();

  try {
    body._id = nanoid();
    body.status = body.isFullyPaid ? "active" : "pending";
    newBooking = new Booking(body);
    newBooking.$session();
    await newBooking.save({ session });
    const unit = await Unit.findById(body.unitId);
    unit?.$session();
    assert.equal(unit?.status, "available");
    unit!.status = "booked";
    await unit?.save();
    res.status(201);
    res.json({ bookingId: body._id, message: "new booking added." });
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    const error = new HttpError(
      "Error occurred while adding a new booking",
      500,
      {
        err,
      }
    );
    return next(error);
  } finally {
    session.endSession();
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let bookings;
  try {
    bookings = await Booking.find().exec();
    if (bookings.length < 1) {
      const error = new HttpError("No booking found.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Error occurred while fetching bookings.",
      500,
      {
        err,
      }
    );
    return next(error);
  }
  res.status(200);
  res.json(bookings);
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.id;

  let booking;
  try {
    booking = await Booking.findById(_id).exec();
    if (!booking) {
      const error = new HttpError("No booking found.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Error occurred while fetching the booking details.",
      500,
      {
        err,
      }
    );
    return next(error);
  }
  res.status(200);
  res.json(booking);
};

export const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.id;

  let booking;
  try {
    booking = await Booking.findById(_id).exec();
    if (!booking) {
      const error = new HttpError("No booking found.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Error occurred while fetching the booking details.",
      500,
      {
        err,
      }
    );
    return next(error);
  }
  await Booking.findByIdAndDelete(_id);
  res.status(200);
  res.json({ bookingId: _id, message: "successfully deleted a booking." });
};

export const updateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.id;

  const body = req.body as Omit<IBooking, "_id" | "guestId">;
  let booking;
  try {
    booking = await Booking.findById(_id).exec();
    if (!booking) {
      const error = new HttpError("No booking found.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Error occurred while fetching the booking details.",
      500,
      {
        err,
      }
    );
    return next(error);
  }

  await Booking.findByIdAndUpdate(_id, body);
  res.status(200);
  res.json({ message: "Booking details updated." });
};
