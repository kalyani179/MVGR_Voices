import Blog from "../models/BlogSchema.js";
import User from "../models/UserSchema.js"
import Notification from "../models/NotificationSchema.js";
import Comment from "../models/CommentSchema.js";
import PodModel from "../models/PodcastSchema.js";
const userWrittenBlogs = (req, res) => {
    let user_id = req.user;
    let { page, draft, query, deletedDocCount } = req.body;

    let maxLimit = 5;
    let skipDocs = (page - 1) * maxLimit;

    if (deletedDocCount) {
        skipDocs -= deletedDocCount;
    }
    Blog.find({ author: user_id, draft, title: new RegExp(query, 'i') })
        .skip(skipDocs)
        .limit(maxLimit)
        .sort({ publishedAt: -1 })
        .select("title banner publishedAt blog_id activity desc draft -_id")
        .then(blogs => {
            return res.status(200).json({ blogs });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        })
}

const userWrittenBlogsCount = (req, res) => {
    let user_id = req.user;
    let { draft, query } = req.body;
    Blog.countDocuments({ author: user_id, draft, title: new RegExp(query, 'i') })
        .then(count => {
            return res.status(200).json({ totalDocs: count });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        })
}
const userUploadedPodcasts = (req, res) => {
    const user_id = req.user;
    const { page, query, deletedDocCount } = req.body;
    const maxLimit = 5;
    let skipPodcasts = (page - 1) * maxLimit;

    if (deletedDocCount) {
        skipPodcasts -= deletedDocCount;
    }

    PodModel.find({ author: user_id, name: new RegExp(query, 'i') })
        .populate('author', 'personal_info.profile_img personal_info.username -_id') // Populate author details
        .skip(skipPodcasts)
        .limit(maxLimit)
        .sort({ publishedAt: -1 })

    .then(podcasts => {
            console.log("Retrieved Podcasts:", podcasts);
            return res.status(200).json({ podcasts });
        })
        .catch(error => {
            return res.status(500).json({ error: error.message });
        });
};
const userUploadedPodcastsCount = (req, res) => {
    const user_id = req.user;
    const { query } = req.body;
    PodModel.countDocuments({ author: user_id, name: new RegExp(query, 'i') })
        .then(count => {
            res.status(200).json({ totalPodcasts: count });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};
const userLikedPodcasts = (req, res) => {
    const user_id = req.user;
    const { query } = req.body;


    PodModel.find({ likes: user_id, name: new RegExp(query, 'i') })
        .populate('author', 'personal_info.profile_img personal_info.username -_id')

    .sort({ publishedAt: -1 })
        .then(podcasts => {
            console.log("Retrieved Podcasts:", podcasts);
            return res.status(200).json({ podcasts });
        })
        .catch(error => {
            return res.status(500).json({ error: error.message });
        });
};

const userLikedBlogs = (req, res) => {
    const user_id = req.user;
    const { query } = req.body;

    Blog.find({ 'likes': user_id, title: new RegExp(query, 'i') })
        .populate('author', 'personal_info.profile_img personal_info.username -_id') // Populate author field with selected fields
        .then(blogs => {
            console.log("Retrieved Blogs:", blogs);
            return res.status(200).json({ blogs });
        })
        .catch(error => {
            return res.status(500).json({ error: error.message });
        });
};

const deleteBlog = (req, res) => {
    let user_id = req.user;
    let { blog_id } = req.body;
    Blog.findOneAndDelete({ blog_id })
        .then(blog => {
            Notification.deleteMany({ blog: blog._id }).then(data => console.log("Notifications Deleted"));
            Comment.deleteMany({ blog_id: blog._id }).then(data => console.log("Comments Deleted"));
            User.findOneAndUpdate({ _id: user_id }, { $pull: { blogs: blog._id }, $inc: { "account_info.total_posts": -1 } })
                .then(user => console.log("Blog Deleted"));
            return res.status(200).json({ status: 'done' })
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        })
};
const deletePodcast = (req, res) => {
    let user_id = req.user;
    let { _id } = req.body;

    // Check if podcast_id is provided
    if (!_id) {
        return res.status(400).json({ error: "Podcast ID is required" });
    }

    PodModel.findOneAndDelete({ _id })
        .then(podcast => {
            if (!podcast) {
                return res.status(404).json({ error: "Podcast not found" });
            }

            User.findOneAndUpdate({ _id: user_id }, { $pull: { podcasts: podcast._id }, $inc: { "account_info.total_uploads": -1 } }).then(user => {
                console.log("Podcast Deleted");
                return res.status(200).json({ status: 'done' });
            }).catch(err => {
                return res.status(500).json({ error: err.message });
            });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        })
};

export { userWrittenBlogs, userWrittenBlogsCount, deleteBlog, userUploadedPodcasts, userUploadedPodcastsCount, deletePodcast, userLikedPodcasts, userLikedBlogs };