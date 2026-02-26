import { Router } from "express";
import {
  getDailyMatches,
  expressInterest,
} from "../controllers/matchController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.get("/daily", protect, getDailyMatches);
router.post("/interest", protect, expressInterest);

export default router;
