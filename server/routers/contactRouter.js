import express from "express";
const router = express.Router();
import { queryMail,feedbackForm, getAllFeedbacks } from "../controllers/contactController.js";

router.post("/query-mail",queryMail);
router.post("/feedback-form",feedbackForm);
router.get("/get-all-feedbacks",getAllFeedbacks);

export default router;