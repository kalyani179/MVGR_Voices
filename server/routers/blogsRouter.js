import express from "express";
const router = express.Router();
import {latestBlogs,allLatestBlogsCount,searchBlogsCount,trendingBlogs,searchBlogs,createBlog} from "../controllers/blogsController.js";
import verifyJWT from "../utilities/userVerification.js";

router.post("/latest-blogs",latestBlogs);
router.post("/all-latest-blogs-count",allLatestBlogsCount);
router.post("/search-blogs-count",searchBlogsCount)
router.get("/trending-blogs",trendingBlogs);
router.post("/search-blogs",searchBlogs);
router.post("/create-blog",verifyJWT,createBlog);
export default router;