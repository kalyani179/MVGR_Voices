const mongoose = require("mongoose");

const podSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    songURL: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("pod", podSchema);