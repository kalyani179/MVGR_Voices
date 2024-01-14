import express from "express";
const router = express.Router();
import {latestBlogs,trendingBlogs,searchBlogs,createBlog} from "../controllers/blogsController.js";
import verifyJWT from "../utilities/userVerification.js";

router.get("/latest-blogs",latestBlogs);
router.get("/trending-blogs",trendingBlogs);
router.post("/search-blogs",searchBlogs);
router.post("/create-blog",verifyJWT,createBlog);
export default router;