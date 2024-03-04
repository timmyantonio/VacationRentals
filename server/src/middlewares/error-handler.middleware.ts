import { HttpError } from "../model/http-error";
import { Request, Response, NextFunction } from "express";

function handleError(
  err: TypeError | HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof HttpError)) {
    customError = new HttpError("Ops, something went wrong.");
  }

  res.status((customError as HttpError).status).send(customError);
}

export default handleError;
