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
    /*category: {
        type: String,
        required: true,
    },*/
}, { timestamps: true });

const PodModel = mongoose.model("pod", podSchema);

export default PodModel;