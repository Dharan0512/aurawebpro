import { Router } from "express";
import {
  blockUser,
  reportUser,
  updateSuccessStatus,
} from "../controllers/moderationController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/block", protect, blockUser);
router.post("/report", protect, reportUser);
router.post("/success-story", protect, updateSuccessStatus);

export default router;
