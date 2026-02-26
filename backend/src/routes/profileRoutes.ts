import { Router } from "express";
import {
  createOrUpdateProfile,
  getMyProfile,
  uploadPhotos,
  deletePhoto,
  uploadHoroscope,
  deleteHoroscope,
  saveDraft,
  getDraft,
} from "../controllers/profileController";
import { protect } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

router.get("/me", protect, getMyProfile);
router.get("/draft", protect, getDraft);
router.post("/draft", protect, saveDraft);
router.patch("/", protect, createOrUpdateProfile);
router.post("/photos", protect, upload.single("photo"), uploadPhotos);
router.delete("/photos/:photoId", protect, deletePhoto);
router.post("/horoscope", protect, upload.single("horoscope"), uploadHoroscope);
router.delete("/horoscope", protect, deleteHoroscope);

export default router;
