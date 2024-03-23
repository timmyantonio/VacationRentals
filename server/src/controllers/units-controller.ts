import { NextFunction, Request, Response } from "express";

import { HttpError } from "../model/http-error";
import { IUnit } from "../types/Unit";
import Unit from "../model/mongo/unit.model";
import { nanoid } from "nanoid";

export const registerUnit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body as IUnit;

  let unit;
  try {
    const isDuplicate = Unit.findOne({
      locationCode: body.locationCode,
      unitNumber: body.unitNumber,
      floorNumber: body.floorNumber,
    });

    if (!!isDuplicate) {
      const error = new HttpError("Unit is already registered.", 409);
      return next(error);
    }

    body._id = nanoid();
    unit = new Unit(body);
    await unit.save();
  } catch (err) {
    const error = new HttpError(
      "Error occurred while registering a unit.",
      500,
      {
        err,
      }
    );
    return next(error);
  }

  res.status(201);
  res.json({ unitId: body._id, message: "new unit added." });
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let units;
  try {
    units = await Unit.find().exec();
    if (units.length < 1) {
      const error = new HttpError("No unit found.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("Error occurred while fetching units.", 500, {
      err,
    });
    return next(error);
  }
  res.status(200);
  res.json(units);
};

export const updateUnit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id: string = req.params._id;
  const body = req.body as Partial<IUnit>;
  console.log(_id);
  let unit;
  try {
    unit = await Unit.findById(_id).exec();
    if (!unit) {
      const error = new HttpError(
        `Unable to find the unit with id of ${_id}`,
        404
      );
      return next(error);
    }
    unit?.set(body);
    await unit?.save();

    res.status(200);
    res.json({ message: "updated successfully." });
  } catch (err) {
    const error = new HttpError(
      "Error occurred while updating unit details.",
      500,
      {
        err,
      }
    );
    return next(error);
  }
};
