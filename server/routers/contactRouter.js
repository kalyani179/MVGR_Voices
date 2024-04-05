import express from "express";
const router = express.Router();
import { queryMail } from "../controllers/contactController.js";

router.post("/query-mail",queryMail);

export default router;