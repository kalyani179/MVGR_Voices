import express from "express";
const router = express.Router();
import {
    savePodcast,
    searchPodcasts,
    searchPodcastsCount,
    getTopPodcasts,
    getUserPodcasts,
    getOnePodcast,
    getAllPodcasts,
    likePodcast,
    isPodcastLiked,
    playPodcast
} from "../controllers/podcastController.js";
import verifyJWT from "../utilities/userVerification.js";

router.post("/save", verifyJWT, savePodcast);
router.post("/search-podcasts", searchPodcasts);
router.post("/search-podcasts-count", searchPodcastsCount);
router.get("/top-podcards", getTopPodcasts);
router.get("/user-podcasts/:authorId", getUserPodcasts);
router.get("/getOne/:id", getOnePodcast);
router.get("/getAll", getAllPodcasts);
router.post('/like-podcast', verifyJWT, likePodcast);
router.post('/is-podcast-liked', verifyJWT, isPodcastLiked);
router.post("/play-podcast", verifyJWT, playPodcast);

export default router;
