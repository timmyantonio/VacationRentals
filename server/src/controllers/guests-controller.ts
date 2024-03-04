import { NextFunction, Request, Response } from "express";

import Guest from "../model/mongo/guest.model";
import { HttpError } from "../model/http-error";
import { IGuest } from "../types";
import { nanoid } from "nanoid";
import { validationResult } from "express-validator";

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.id;

  let guest;
  try {
    guest = await Guest.findById(_id).exec();
    if (!guest) {
      const error = new HttpError("No guest found.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Error occurred while fetching the guest details.",
      500,
      {
        err,
      }
    );
    return next(error);
  }
  res.status(200);
  res.json(guest);
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let guests;
  try {
    guests = await Guest.find().exec();
    if (guests.length < 1) {
      const error = new HttpError("No guests found.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("Error occurred while fetching guests.", 500, {
      err,
    });
    return next(error);
  }
  res.status(200);
  res.json(guests);
};

export const addGuest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body as IGuest;

  let newGuest;
  try {
    try {
      const guestFound = await Guest.findOne({
        "contact.mobileNumber": body.contact.mobileNumber,
      }).exec();
      if (guestFound) {
        const error = new HttpError("Guest is already registered.", 409, {
          _id: guestFound._id,
          forename: guestFound.name?.forename,
          surname: guestFound.name?.surname,
        });
        return next(error);
      }
    } catch (error) {}
    body._id = nanoid();
    newGuest = new Guest(body);
    await newGuest.save();
  } catch (err) {
    const error = new HttpError("Error occurred while adding a guest", 500, {
      err,
    });
    return next(error);
  }
  res.status(201);
  res.json({ guestId: body._id, message: "new guest is created." });
};

export const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.id;

  let guest;
  try {
    guest = await Guest.findById(_id).exec();
    if (!guest) {
      const error = new HttpError("No guest found.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Error occurred while fetching the guest details.",
      500,
      {
        err,
      }
    );
    return next(error);
  }
  await Guest.findByIdAndDelete(_id);
  res.status(200);
  res.json({ guestId: _id, message: "successfully deleted a guest" });
};

export const updateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.id;

  const body = req.body as Omit<IGuest, "_id" | "joinedDate">;
  let guest;
  try {
    guest = await Guest.findById(_id).exec();
    if (!guest) {
      const error = new HttpError("No guest found.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Error occurred while fetching the guest details.",
      500,
      {
        err,
      }
    );
    return next(error);
  }

  await Guest.findByIdAndUpdate(_id, body);
  res.status(200);
  res.json({ message: "Guest details updated." });
};
