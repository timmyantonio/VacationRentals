import {
  addBooking,
  deleteById,
  getAll,
  getById,
  updateById,
} from "../controllers/bookings-controller";

import express from "express";

const router = express.Router();

router.post("/", addBooking);
router.get("/", getAll);
router.get("/:id", getById);
router.delete("/:id", deleteById);
router.put("/:id", updateById);

export default router;
