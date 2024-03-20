import express from "express";
const router = express.Router();
import { queryMail,feedbackForm } from "../controllers/contactController.js";

router.post("/query-mail",queryMail);
router.post("/feedback-form",feedbackForm);

export default router;