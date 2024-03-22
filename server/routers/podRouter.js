import express from "express";
const router = express.Router();
import PodModel from "../models/PodcastSchema.js";
import verifyJWT from "../utilities/userVerification.js";
import user from "../models/UserSchema.js";
router.post("/save", verifyJWT, async(req, res) => {
    const { name, imageURL, songURL, description, category, publishedAt } = req.body;
    const authorId = req.user; // Get the author's object ID from req.user
    try {
        const newPod = new PodModel({
            name,
            imageURL,
            songURL,
            description,
            category,
            publishedAt,
            author: authorId, // Assign the author's object ID to the author field
        });

        const savedPod = await newPod.save();

        // Update the user document with the uploaded podcast's ID
        await user.findByIdAndUpdate(authorId, { $push: { podcasts: savedPod._id } });

        return res.status(200).json({ success: true, podcast: savedPod });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message });
    }
});
// Change the route path for search endpoint
router.post("/search", async(req, res) => {
    console.log("Received search request:", req.body); // Log the request body
    const { query } = req.body;
    try {
        // Perform search operation based on the 'query' parameter
        const searchResult = await PodModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Search by podcast name
                { category: { $regex: query, $options: 'i' } } // Search by category
            ]
        }).select("-_id"); // Exclude _id field from the response
        console.log("Search result:", searchResult); // Log the search result
        if (searchResult.length > 0) {
            return res.status(200).json({ success: true, podcasts: searchResult });
        } else {
            return res.status(200).json({ success: true, podcasts: [] }); // Return empty array if no podcasts found
        }
    } catch (error) {
        console.error("Error searching podcasts:", error); // Log any errors that occur
        return res.status(500).json({ success: false, msg: error.message });
    }
});
// Like a podcast
router.post('/like-podcast', async(req, res) => {
    const user_id = req.user; // Assuming user is authenticated and user ID is available in req.user
    const { _id, isLiked } = req.body; // Destructure _id instead of podcast_id

    try {
        let incrementVal = isLiked ? 1 : -1; // If already liked, increment the like count; otherwise, decrement
        const updatedPodcast = await PodModel.findOneAndUpdate({ _id }, { $inc: { 'activity.total_likes': incrementVal } }, // Use correct field name for total_likes
            { new: true }
        );

        return res.status(200).json({ success: true, podcast: updatedPodcast });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/is-podcast-liked', async(req, res) => {
    const user_id = req.user;
    const { _id } = req.body; // Destructure _id instead of podcast_id

    try {
        const podcast = await PodModel.findById(_id);
        if (!podcast) {
            return res.status(404).json({ success: false, error: 'Podcast not found' });
        }

        const isLiked = podcast.likes.includes(user_id);
        return res.status(200).json({ success: true, isLiked });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
router.get('/top-podcards', async(req, res) => {
    try {
        const topPodcards = await PodModel.find().sort({ likes: -1 }).limit(3); // Assuming likes is the field representing likes count
        res.json(topPodcards);
    } catch (error) {
        console.error('Error fetching top podcards:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get("/getOne/:id", async(req, res) => {
    const filter = { _id: req.params.id };
    const data = await PodModel.findOne(filter);
    if (data) {
        return res.status(200).send({ success: true, podcast: data });
    } else {
        return res.status(400).send({ success: false, msg: "data not found" });
    }
});

router.get("/getAll", async(req, res) => {
    const options = {
        sort: {
            createdAt: 1,
        },
    };

    try {
        const data = await PodModel.find({}, {}, options); // Passing an empty object as the filter
        if (data.length > 0) {
            return res.status(200).send({ success: true, podcast: data });
        } else {
            return res.status(400).send({ success: false, msg: "data not found" });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).send({ success: false, msg: "Internal server error" });
    }
});


//module.exports = router;
export default router;