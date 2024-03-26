import express from "express";
const router = express.Router();
import PodModel from "../models/PodcastSchema.js";
import verifyJWT from "../utilities/userVerification.js";
import user from "../models/UserSchema.js";
import Notification from "../models/NotificationSchema.js";
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
        await user.findByIdAndUpdate(authorId, { $push: { podcasts: savedPod._id }, $inc: { "account_info.total_uploads": 1 } });

        return res.status(200).json({ success: true, podcast: savedPod });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message });
    }
});
// Change the route path for search endpoint
router.post("/search-podcasts", async(req, res) => {
    const { category, query, author, page, limit } = req.body;
    let findQuery = {}; // No draft condition needed

    if (category) {
        findQuery.category = category;
    }

    if (query) {
        findQuery.name = { $regex: new RegExp(query, 'i') }; // Assuming name is the field for podcast name
    }

    if (author) {
        findQuery.author = author; // Assuming author is the ObjectId of the author
    }

    const maxLimit = limit ? limit : 4;

    try {
        const podcasts = await PodModel.find(findQuery)
            .populate("author", "personal_info.profile_img personal_info.username personal_info.fullname -_id")
            .sort({ "publishedAt": -1 })
            .skip((page - 1) * maxLimit)
            .limit(maxLimit);

        return res.status(200).json({ podcasts });
    } catch (error) {
        console.error("Error searching podcasts:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
router.post("/search-podcasts-count", async(req, res) => {

    let { category, author, query } = req.body;
    let findQuery = {};

    if (category) {
        findQuery.category = category;
    } else if (query) {
        findQuery.name = new RegExp(query, 'i');
    } else if (author) {
        findQuery.author = author;
    }

    try {
        const count = await PodModel.countDocuments(findQuery);
        return res.status(200).json({ totalDocs: count });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});






router.get('/top-podcards', async(req, res) => {
    try {
        const topPodcards = await PodModel.find().sort({ 'activity.total_likes': -1 }).limit(3); // Assuming likes is the field representing likes count
        res.json(topPodcards);
    } catch (error) {
        console.error('Error fetching top podcards:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
const getAllPodcastsByAuthorId = async(authorId) => {
    try {
        // Query the PodModel to find all podcasts with the specified authorId
        const podcasts = await PodModel.find({ author: authorId });

        // Return the found podcasts
        return podcasts;
    } catch (error) {
        // Handle any errors that occur during the query
        console.error("Error fetching podcasts by author ID:", error);
        throw new Error("Failed to fetch podcasts by author ID");
    }
};
router.get("/user-podcasts/:authorId", async(req, res) => {
    const authorId = req.params.authorId;

    try {
        // Call the function to fetch all podcasts by author ID
        const podcasts = await getAllPodcastsByAuthorId(authorId);

        // Respond with the fetched podcasts
        res.json({ success: true, podcasts: podcasts });
    } catch (error) {
        // Handle errors and respond with an error message
        res.status(500).json({ success: false, error: error.message });
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

// Assuming this is your existing code to fetch all podcasts
router.get("/getAll", async(req, res) => {
    try {
        const podcasts = await PodModel.find({}).populate("author", "personal_info.profile_img personal_info.username -_id");
        if (podcasts.length > 0) {
            return res.status(200).json({ success: true, podcasts: podcasts });
        } else {
            return res.status(404).json({ success: false, msg: "No podcasts found" });
        }
    } catch (error) {
        console.error("Error fetching podcasts:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});

router.post('/like-podcast', verifyJWT, async(req, res) => {
    const user_id = req.user;
    const { _id, isLiked } = req.body;

    try {
        const podcast = await PodModel.findById(_id).populate('author');
        if (!podcast) {
            return res.status(404).json({ success: false, error: 'Podcast not found' });
        }

        let incrementVal = isLiked ? 1 : -1;
        let updatedPodcast;

        if (isLiked) {
            // If the user is liking the podcast
            updatedPodcast = await PodModel.findOneAndUpdate({ _id }, { $inc: { 'activity.total_likes': incrementVal }, $push: { likes: user_id } }, { new: true });
            await Notification.create({
                type: 'like-podcast',
                podcast: _id,
                notification_for: podcast.author, // Assuming you want to notify the author of the podcast
                user: user_id
            });

        } else {
            // If the user is unliking the podcast
            updatedPodcast = await PodModel.findOneAndUpdate({ _id }, { $inc: { 'activity.total_likes': incrementVal }, $pull: { likes: user_id } }, { new: true });
            await Notification.findOneAndDelete({ type: 'like-podcast', podcast: _id, user: user_id });
        }

        return res.status(200).json({ success: true, podcast: updatedPodcast });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});


router.post('/is-podcast-liked', verifyJWT, async(req, res) => {
    const user_id = req.user;
    const { _id } = req.body;

    try {
        const podcast = await PodModel.findById(_id);
        if (!podcast) {
            return res.status(404).json({ success: false, error: 'Podcast not found' });
        }

        const isLiked = podcast.likes.includes(user_id);
        return res.status(200).json({ success: true, isLiked, likesCount: podcast.activity.total_likes });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
router.post("/play-podcast", verifyJWT, async(req, res) => {
    const { podcastId } = req.body; // Assuming userId is included in the request body or retrieved from JWT
    const userId = req.user;
    try {
        // Retrieve the podcast to get the user who uploaded it
        const podcast = await PodModel.findById(podcastId);

        if (!podcast) {
            return res.status(404).json({ success: false, message: "Podcast not found" });
        }

        // Check if the current user is the author of the podcast
        if (podcast.author.toString() === userId) {
            // If the current user is the author, do not increment play count
            return res.status(200).json({ success: true, podcast });
        }

        // Increment play count in PodcastSchema
        const updatedPodcast = await PodModel.findByIdAndUpdate(
            podcastId, { $inc: { "activity.total_plays": 1 } }, { new: true }
        );

        // Increment total plays count in UserSchema of the user who uploaded the podcast
        await user.findByIdAndUpdate(
            podcast.author, { $inc: { "account_info.total_plays": 1 } }
        );

        // Increment total plays count in UserSchema of the current user
        await UserModel.findByIdAndUpdate(
            userId, { $inc: { "account_info.total_plays": 1 } }
        );

        return res.status(200).json({ success: true, podcast: updatedPodcast });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

//module.exports = router;
export default router;