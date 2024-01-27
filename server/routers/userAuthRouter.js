import express from "express";
import {signup,signin,verifyEmailToken,googleAuth} from "../controllers/userAuthController.js";
const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.get("/:id/verify/:token/",verifyEmailToken);
router.post("/google-auth",googleAuth);

export default router;