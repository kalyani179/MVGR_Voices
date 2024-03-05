import express from "express";
const router = express.Router();
import verifyJWT from "../utilities/userVerification.js";
import { deleteBlog, userWrittenBlogs, userWrittenBlogsCount } from "../controllers/dashboardController.js";

router.post("/user-written-blogs",verifyJWT,userWrittenBlogs);
router.post("/user-written-blogs-count",verifyJWT,userWrittenBlogsCount);
router.post("/delete-blog",verifyJWT,deleteBlog);

export default router;