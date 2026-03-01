import { Router } from "express";
import { register, login, changePassword } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// Example protected route for testing
router.get("/me", protect, (req, res) => {
  res.json({ message: "You have access to protected auth routes." });
});

router.post("/change-password", protect, changePassword);

export default router;
