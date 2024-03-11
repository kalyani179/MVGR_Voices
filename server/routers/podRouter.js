import express from "express";
const router = express.Router();
import PodModel from "../models/PodcastSchema.js";

router.post("/save", async(req, res) => {
    const { name, imageURL, songURL, description } = req.body;
    console.log('Received data:', req.body);
    try {
        const newPod = new PodModel({
            name,
            imageURL,
            songURL,
            description,
        });

        const savedPod = await newPod.save();
        return res.status(200).json({ success: true, podcast: savedPod });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message });
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