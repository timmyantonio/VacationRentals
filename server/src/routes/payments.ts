import {
  addPayment,
  deleteById,
  getAll,
  getById,
  updateById,
} from "../controllers/payments-controller";

import express from "express";

const router = express.Router();

router.post("/", addPayment);
router.get("/", getAll);
router.get("/:id", getById);
router.delete("/:id", deleteById);
router.put("/:id", updateById);

export default router;
