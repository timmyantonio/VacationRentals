import { NextFunction, Request, Response } from "express";

import Booking from "../model/mongo/booking.model";
import { HttpError } from "../model/http-error";
import { IPayment } from "../types";
import Payment from "../model/mongo/payment.model";
import { nanoid } from "nanoid";
import { validationResult } from "express-validator";

export const addPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body as IPayment;

  let newPayment;
  try {
    body._id = nanoid();
    newPayment = new Payment(body);
    await newPayment.save();

    // insert payment id to booking
    var booking = await Booking.findById(body.bookingId).exec();
    booking!.payments.unshift(body._id);
    await booking?.save();
  } catch (err) {
    const error = new HttpError(
      "Error occurred while adding a new payment",
      500,
      {
        err,
      }
    );
    return next(error);
  }
  res.status(201);
  res.json({ paymentId: body._id, message: "new payment added." });
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let payments;
  try {
    payments = await Payment.find().exec();
    if (payments.length < 1) {
      const error = new HttpError("No payment found.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Error occurred while fetching payments.",
      500,
      {
        err,
      }
    );
    return next(error);
  }
  res.status(200);
  res.json(payments);
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.id;

  let payment;
  try {
    payment = await Payment.findById(_id).exec();
    if (!payment) {
      const error = new HttpError("No payment found.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Error occurred while fetching the payment details.",
      500,
      {
        err,
      }
    );
    return next(error);
  }
  res.status(200);
  res.json(payment);
};

export const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.id;

  // delete payment id in booking
  let payment;
  try {
    payment = await Payment.findById(_id).exec();
    if (!payment) {
      const error = new HttpError("No payment found.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Error occurred while fetching the payment details.",
      500,
      {
        err,
      }
    );
    return next(error);
  }
  await Payment.findByIdAndDelete(_id);
  res.status(200);
  res.json({ paymentId: _id, message: "successfully deleted a payment." });
};

export const updateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.id;

  const body = req.body as Omit<IPayment, "_id" | "guestId" | "bookingId">;
  let payment;
  try {
    payment = await Payment.findById(_id).exec();
    if (!payment) {
      const error = new HttpError("No payment found.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Error occurred while fetching the payment details.",
      500,
      {
        err,
      }
    );
    return next(error);
  }

  await Payment.findByIdAndUpdate(_id, body);
  res.status(200);
  res.json({ message: "Payment details updated." });
};
