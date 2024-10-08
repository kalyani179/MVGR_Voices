import express from "express";
const router = express.Router();
import verifyJWT from "../utilities/userVerification.js";
import { deleteBlog, userWrittenBlogs, userWrittenBlogsCount, userUploadedPodcasts, userUploadedPodcastsCount, deletePodcast, userLikedPodcasts, userLikedBlogs } from "../controllers/dashboardController.js";

router.post("/user-written-blogs", verifyJWT, userWrittenBlogs);
router.post("/user-written-blogs-count", verifyJWT, userWrittenBlogsCount);
router.post("/delete-blog", verifyJWT, deleteBlog);
router.post("/user-uploaded-podcasts", verifyJWT, userUploadedPodcasts);
router.post("/user-uploaded-podcasts-count", verifyJWT, userUploadedPodcastsCount);
router.post("/delete-podcasts", verifyJWT, deletePodcast);
router.post("/user-liked-podcasts", verifyJWT, userLikedPodcasts);
router.post("/user-liked-blogs", verifyJWT, userLikedBlogs);
export default router;