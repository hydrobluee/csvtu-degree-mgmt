import { Router } from "express";
import * as Ctrl from "../controllers/applicationController.js";

const router = Router();
router.post("/applications", Ctrl.create);
router.get("/applications/roll/:rollNumber", Ctrl.lookupByRoll);
router.get("/applications", Ctrl.listByStatus);
router.put("/applications/:id", Ctrl.updateStatus);
router.get("/applications/all", Ctrl.getAllApplications);

export default router;
