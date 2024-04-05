import express from "express";
const router = express.Router();
import { feedbackForm, getAllFeedbacks } from "../controllers/feedbackController.js";

router.post("/feedback-form",feedbackForm);
router.get("/get-all-feedbacks",getAllFeedbacks);

export default router;