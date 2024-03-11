import express from "express";
const router = express.Router();
import { changePassword } from "../controllers/settingsController.js";
import verifyJWT from "../utilities/userVerification.js";

router.post("/change-password",verifyJWT,changePassword);

export default router;