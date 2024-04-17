import {
  getAll,
  getById,
  registerUnit,
  resetUnits,
  updateUnit,
} from "../controllers/units-controller";

import express from "express";

const router = express.Router();

export default router;

router.get("/", getAll);
router.get("/:_id", getById);
router.post("/", registerUnit);
router.patch("/:_id", updateUnit);
router.patch("/", resetUnits);
