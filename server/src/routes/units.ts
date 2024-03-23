import express from "express";
import { registerUnit } from "../controllers/units-controller";

const router = express.Router();

export default router;

router.post("/", registerUnit);
