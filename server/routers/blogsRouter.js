import express from "express";
const router = express.Router();
import {latestBlogs,allLatestBlogsCount,trendingBlogs,searchBlogs,searchBlogsCount,searchUsers,getProfile,createBlog, getBlog, likeBlog, isBlogLiked, addComment, getBlogComments, getReplies, deleteComment} from "../controllers/blogsController.js";
import verifyJWT from "../utilities/userVerification.js";

router.post("/latest-blogs",latestBlogs);
router.post("/all-latest-blogs-count",allLatestBlogsCount);
router.get("/trending-blogs",trendingBlogs);
router.post("/search-blogs",searchBlogs);
router.post("/search-blogs-count",searchBlogsCount);
router.post("/search-users",searchUsers);
router.post("/get-profile",getProfile)
router.post("/create-blog",verifyJWT,createBlog);
router.post("/get-blog",getBlog);
router.post("/like-blog",verifyJWT,likeBlog);
router.post("/is-blog-liked",verifyJWT,isBlogLiked);
router.post("/add-comment",verifyJWT,addComment);
router.post("/get-blog-comments",getBlogComments);
router.post("/get-replies",getReplies);
router.post("/delete-comment",verifyJWT,deleteComment);
export default router;