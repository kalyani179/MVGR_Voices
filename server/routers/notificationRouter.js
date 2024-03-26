import express from "express";
const router = express.Router();
import verifyJWT from "../utilities/userVerification.js";

import { allNotificationsCount, newNotification, notifications } from "../controllers/notificationController.js"

router.get("/new-notification", verifyJWT, newNotification);
router.post("/notifications", verifyJWT, notifications);
router.post("/all-notifications-count", verifyJWT, allNotificationsCount);
export default router;