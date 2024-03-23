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
