import express from "express";
const router = express.Router();
import { changePassword, updateProfile, updatedProfileImg } from "../controllers/settingsController.js";
import verifyJWT from "../utilities/userVerification.js";

router.post("/change-password",verifyJWT,changePassword);
router.post("/update-profile-img",verifyJWT,updatedProfileImg);
router.post("/update-profile",verifyJWT,updateProfile);

export default router;