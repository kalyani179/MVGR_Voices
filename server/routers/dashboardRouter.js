import express from "express";
const router = express.Router();
import verifyJWT from "../utilities/userVerification.js";
import { userWrittenBlogs, userWrittenBlogsCount } from "../controllers/dashboardController.js";

router.post("/user-written-blogs",verifyJWT,userWrittenBlogs);
router.post("/user-written-blogs-count",verifyJWT,userWrittenBlogsCount);

export default router;