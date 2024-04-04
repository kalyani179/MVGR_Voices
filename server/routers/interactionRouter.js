import express from "express";
const router = express.Router();
import {likeBlog, isBlogLiked, addComment, getBlogComments, getReplies, deleteComment } from "../controllers/interactionController.js";
import verifyJWT from "../utilities/userVerification.js";


router.post("/like-blog", verifyJWT, likeBlog);
router.post("/is-blog-liked", verifyJWT, isBlogLiked);
router.post("/add-comment", verifyJWT, addComment);
router.post("/get-blog-comments", getBlogComments);
router.post("/get-replies", getReplies);
router.post("/delete-comment", verifyJWT, deleteComment);

export default router;