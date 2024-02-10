import express from "express";
import {signup,signin,verifyEmailToken,googleAuth} from "../controllers/userAuthController.js";
const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/verifyEmailToken",verifyEmailToken);
router.post("/google-auth",googleAuth);

export default router;