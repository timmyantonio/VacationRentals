import { HttpError } from "./../model/http-error";
import express, { NextFunction, Request, Response } from "express";
import { resolve } from "path";
import * as TJS from "typescript-json-schema";
import { nanoid } from "nanoid";
import Holidays from "date-holidays";
const router = express.Router();
const settings: TJS.PartialArgs = {
  required: true,
};

router.get(
  "/ts-json/:fileName",
  (req: Request, res: Response, next: NextFunction) => {
    const fileName = req.params.fileName;
    const program = TJS.getProgramFromFiles([
      resolve(`src/types/${fileName}.ts`),
    ]);
    try {
      const schema = TJS.generateSchema(program, `I${fileName}`, settings);
      res.json(schema);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/generate-loan-data",
  (req: Request, res: Response, next: NextFunction) => {
    const loanData = [];
    const loanTypes = ["Cash", "Business", "Salary", "Property"];
    const terms = ["3 months", "6 months", "12 months"];
    const statuses = [
      "submitted",
      "verified",
      "approved",
      "declined",
      "active",
      "cleared",
    ];

    try {
      for (let i = 1; i <= 20; i++) {
        loanData.push({
          _i: nanoid(),
          loanType: loanTypes[Math.floor(Math.random() * loanTypes.length)],
          officerId: 1111,
          debtorId: `debtor${i}`,
          date: new Date(),
          amount: Math.floor(Math.random() * (20000 - 1000 + 1) + 1000),
          purpose: `Purpose ${i}`,
          collateral: `Collateral ${i}`,
          terms: terms[Math.floor(Math.random() * terms.length)],
          comments: `Comments ${i}`,
          status: statuses[Math.floor(Math.random() * statuses.length)],
        });
      }

      res.status(200);
      res.json(loanData);
      return;
    } catch (error) {
      return next(error);
    }
  }
);

router.get(
  "/:code/:year",
  (req: Request, res: Response, next: NextFunction) => {
    const countryCode = req.params.code;
    const year = req.params.year;
    const hd = new Holidays();
    hd.init(countryCode.toUpperCase());

    const result = hd
      .getHolidays(year)
      .filter(
        (h: {
          date: string;
          start: Date;
          end: Date;
          name: string;
          type: string;
          rule: string;
          substitute?: boolean;
          note?: string;
        }) => h.note === "Non-working Day" || h.type === "public"
      );

    res.status(200);
    res.json(result);
  }
);

export default router;
