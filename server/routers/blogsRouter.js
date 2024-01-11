import express from "express";
const router = express.Router();
import {latestBlogs,createBlog} from "../controllers/blogsController.js";
import verifyJWT from "../utilities/userVerification.js";

router.get("/latest-blogs",latestBlogs);
router.post("/create-blog",verifyJWT,createBlog);

export default router;