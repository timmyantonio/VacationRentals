import {
  addGuest,
  deleteById,
  getAll,
  getById,
  getByMobile,
  updateById
} from "../controllers/guests-controller";

import express from "express";

const router = express.Router();

router.post("/", addGuest);
router.get("/", getAll);
router.get("/mobile/:mobileNumber", getByMobile);
router.get("/:id", getById);
router.delete("/:id", deleteById);
router.put("/:id", updateById);

export default router;
