import express from "express";
const router = express.Router();
import { changePassword, updatedProfileImg } from "../controllers/settingsController.js";
import verifyJWT from "../utilities/userVerification.js";

router.post("/change-password",verifyJWT,changePassword);
router.post("/update-profile-img",verifyJWT,updatedProfileImg);

export default router;