import express from "express";
import {signup,signin,verifyEmailToken,googleAuth, forgotPassword, resetPassword} from "../controllers/userAuthController.js";
const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/verifyEmailToken",verifyEmailToken);
router.post("/google-auth",googleAuth);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:id/:token",resetPassword);

export default router;