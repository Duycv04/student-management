import express from "express";
import { getProfile, updateProfile, upload } from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, upload.single("img"), updateProfile);

export default router;
