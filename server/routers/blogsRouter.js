import express from "express";
const router = express.Router();
import {latestBlogs,allLatestBlogsCount,trendingBlogs,searchBlogs,searchBlogsCount,searchUsers,createBlog} from "../controllers/blogsController.js";
import verifyJWT from "../utilities/userVerification.js";

router.post("/latest-blogs",latestBlogs);
router.post("/all-latest-blogs-count",allLatestBlogsCount);
router.get("/trending-blogs",trendingBlogs);
router.post("/search-blogs",searchBlogs);
router.post("/search-blogs-count",searchBlogsCount);
router.post("/search-users",searchUsers);
router.post("/create-blog",verifyJWT,createBlog);
export default router;