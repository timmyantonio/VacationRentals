import { NextFunction } from "express";

export const tryCatchFn = (fn: any) => {
  const s = (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
