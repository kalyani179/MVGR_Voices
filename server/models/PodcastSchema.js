import mongoose, { Schema } from "mongoose";

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
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    activity: {
        total_likes: {
            type: Number,
            default: 0
        },
    },

}, {
    timestamps: {
        createdAt: 'publishedAt'
    }
});

const PodModel = mongoose.model("pod", podSchema);

export default PodModel;