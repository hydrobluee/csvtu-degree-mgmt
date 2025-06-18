import { Router } from "express";
import {
  createApplication,
  getByRoll,
  listByStatus,
  updateStatus,
} from "../controllers/applicationController.js";

const router = Router();
router.post("/applications", createApplication);
router.get("/applications/roll/:rollNumber", getByRoll);
router.get("/applications", listByStatus);
router.put("/applications/:id", updateStatus);

export default router;
