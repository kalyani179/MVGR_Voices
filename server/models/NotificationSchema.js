import mongoose, { Schema } from "mongoose";

const notificationSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["like", "comment", "reply", "like-podcast"],
        required: true
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'blogs'
    },
    podcast: {
        type: Schema.Types.ObjectId,
        ref: 'pod'
    },
    notification_for: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    },
    reply: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    },
    replied_on_comment: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export default mongoose.model("notifications", notificationSchema);