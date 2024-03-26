import express from "express";
const router = express.Router();
import verifyJWT from "../utilities/userVerification.js";
import { deleteBlog, userWrittenBlogs, userWrittenBlogsCount, userUploadedPodcasts, userUploadedPodcastsCount, deletePodcast } from "../controllers/dashboardController.js";

router.post("/user-written-blogs", verifyJWT, userWrittenBlogs);
router.post("/user-written-blogs-count", verifyJWT, userWrittenBlogsCount);
router.post("/delete-blog", verifyJWT, deleteBlog);
router.post("/user-uploaded-podcasts", verifyJWT, userUploadedPodcasts);
router.post("/user-uploaded-podcasts-count", verifyJWT, userUploadedPodcastsCount);
router.post("/delete-podcasts", verifyJWT, deletePodcast);

export default router;