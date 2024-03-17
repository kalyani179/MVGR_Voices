import { nanoid } from "nanoid";

import Blog from "../models/BlogSchema.js";
import User from "../models/UserSchema.js"
import Notification from "../models/NotificationSchema.js";
import Comment from "../models/CommentSchema.js";

const latestBlogs = async (req,res) =>{
    let {page} = req.body;
    let maxLimit = 8;

    await Blog.find({draft:false})
    .populate("author","personal_info.profile_img personal_info.username personal_info.fullname -_id")
    .sort({"publishedAt":-1})
    .select("blog_id title desc banner activity tags publishedAt -_id")
    .skip((page-1)*maxLimit)
    .limit(maxLimit)
    .then( blogs => {
        return res.status(200).json({blogs});
    }).catch(err =>{
        return res.status(500).json({error:"Internal Server Error"});
    })
}

const allLatestBlogsCount = async (req,res) => {
    Blog.countDocuments({draft:false})
    .then(count => {
        return res.status(200).json({totalDocs:count});
    }).catch(err =>{
        return res.status(500).json({error:err.message});
    })
}

const trendingBlogs = async (req,res) => {
    await Blog.find({draft:false})
    .populate("author","personal_info.profile_img personal_info.username personal_info.fullname -_id")
    .sort({"activity.total_read":-1,"activity.total_likes":-1,"publishedAt":-1})
    .select("blog_id banner title activity.total_likes publishedAt -_id")
    .limit(3)
    .then( blogs => {
        return res.status(200).json({blogs});
    }).catch(err =>{
        return res.status(500).json({error:"Internal Server Error"});
    })
}

const searchBlogs = async (req,res) => {
    
    let {tag,query,author,page,limit,eliminate_blog} = req.body;
    let findQuery;
    if(tag){
        findQuery = {tags:tag,draft:false,blog_id:{$ne:eliminate_blog}};
    }else if(query){
        findQuery = {draft:false,title:new RegExp(query,'i')}
    }else if(author) {
        findQuery = {author,draft:false}
    }
    let maxLimit = limit ? limit : 4;
    Blog.find(findQuery)
    .populate("author","personal_info.profile_img personal_info.username personal_info.fullname -_id")
    .sort({"publishedAt":-1})
    .select("blog_id title desc banner activity tags publishedAt -_id")
    .skip((page-1)*maxLimit)
    .limit(maxLimit)
    .then( blogs => {
        return res.status(200).json({blogs});
    }).catch(err =>{
        return res.status(500).json({error:"Internal Server Error"});
    })
    
}

const searchBlogsCount = async(req,res) =>{
    let {tag,author,query} = req.body;
    let findQuery;
    if(tag){
        findQuery = {tags:tag,draft:false};
    }else if(query){
        findQuery = {draft:false,title:new RegExp(query,'i')}
    }else if(author) {
        findQuery = {author,draft:false}
    }
    Blog.countDocuments(findQuery)
    .then(count => {
        return res.status(200).json({totalDocs:count});
    }).catch(err =>{
        return res.status(500).json({error:err.message});
    })
}

const searchUsers = async (req,res) =>{
    let {query} = req.body;
    User.find({"personal_info.username":new RegExp(query,'i')})
    .limit(50)
    .select("personal_info.fullname personal_info.username personal_info.profile_img")
    .then(users=>{
        return res.status(200).json({users})
    })
    .catch(err=>{
        return res.status(500).json({error:err.message});
    })
}

const getProfile = async (req,res) => {
    let {username} = req.body;
    User.findOne({"personal_info.username":username})
    .select("-personal_info.password -google_auth -updatedAt -blogs")
    .then(user =>{
        return res.status(200).json(user);
    })
    .catch(err=>{
        return res.status(500).json({error:err.message});
    })
}

const createBlog = async (req, res) => {
    try{
        let authorID = req.user;
        let {title,desc,banner,tags,content,draft,id} = req.body;
    
        if(!title.length){
            return res.status(403).json({error:"You Must Provide a Title to publish the blog"});
        }
        if(!draft){
            if(!desc.length || desc.length>200){
                return res.status(403).json({error:"You Must Provide a Blog Description Under 200 Characters"});
            }
            if(!banner.length){
                return res.status(403).json({error:"You Must Provide a Blog Banner to publish the blog"})
            }
            if(!content.blocks.length){
                return res.status(403).json({error:"You Must Write Something To Publish it!"})
            }
            if(!tags.length || tags.length>10){
                return res.status(403).json({error:"Provide tags in order to publish the blog, Maximum 10"});
            }
        }
        
        tags = tags.map(tag => tag.toLowerCase());
    
        let blog_id = id || title.replace(/[^a-zA-z0-9]/g,' ').replace(/\s+/g,"-").trim()+nanoid();
        if(id){
            Blog.findOneAndUpdate({blog_id},{title,desc,banner,content,tags,draft:draft ? draft : false})
            .then(blog => {
                return res.status(200).json({id:blog_id});
            })
            .catch(err => {
                return res.status(500).json({error:"Failed To Update Blogs"});
            })
        }else{
            let blog = new Blog({
                title,desc,banner,content,tags,author:authorID,blog_id,draft:Boolean(draft)
            })
            await blog.save().then(async (blog)=>{
                let incrementVal = draft ? 0 : 1;
                let user = await User.findOneAndUpdate({_id:authorID},{$inc:{"account_info.total_posts" : incrementVal },$push:{"blogs":blog._id}});
                if(user){
                    return res.status(200).json({id:blog.blog_id});
                }else{
                    return res.status(500).json({error:"Failed to update total Posts Number"})
                }
            }).catch(err => {
                return res.status(500).json({error:err.message});
            })
        }
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
    
}

const getBlog = (req,res) =>{

    let {blog_id,draft,mode} = req.body;
    let incrementVal = mode=="edit" ? 0 : 1;
    Blog.findOneAndUpdate({blog_id},{$inc : {"activity.total_reads":incrementVal}})
    .populate("author","personal_info.fullname personal_info.username personal_info.profile_img")
    .select("title desc content banner activity publishedAt blog_id tags")
    .then(blog =>{
        console.log(blog.author.personal_info.username);
        console.log(incrementVal);
        User.findOneAndUpdate({"personal_info.username":blog.author.personal_info.username},{$inc : {"account_info.total_reads":incrementVal}})
        .then(()=>{
            if(blog.draft && !draft){
                return res.status(500).json({error:"You Cannot Access Draft Blog"});
            }
            return res.status(200).json({blog});
        })
    })
    .catch(err => {
        return res.status(500).json({error:err.message});
    })
}

const likeBlog = async (req,res) => {
    let user_id = req.user;
    let {_id,isLiked} = req.body;
    let incrementVal = !isLiked ? 1 : -1;
    Blog.findOneAndUpdate({_id},{$inc : {"activity.total_likes":incrementVal}})
    .then(blog => {
        if(!isLiked){
            let like = new Notification({
                type:"like",
                blog:_id,
                notification_for:blog.author,
                user:user_id
            })
            like.save().then(notification => {
                return res.status(200).json({isLiked:true});
            })
        }else{
            Notification.findOneAndDelete({user:user_id,blog:_id,type:"like"})
            .then(data => {
                return res.status(200).jso({isLiked:false});
            })
            .catch(err => {
                return res.status(500).json({error:err.message});
            })
        }
    })
}
const isBlogLiked = async(req,res) =>{
    let user_id = req.user;
    let {_id} = req.body;
    Notification.exists({user:user_id,type:"like",blog:_id})
    .then(result => {
        return res.status(200).json({result});
    })
    .catch(err => {
        return res.status(500).json({error:err.message})
    })
}

const addComment = async (req,res) => {
    let user_id = req.user;
    let {_id,comment,blog_author,replying_to} = req.body;
    if(!comment.length){
        return res.status(403).json({"error":"Write Something to Leave a comment!"})
    }
    let commentObj = {
        blog_id :_id,blog_author,comment,commented_by:user_id
    }
    if(replying_to){
        commentObj.parent = replying_to;
        commentObj.isReply = true;
    }
    new Comment(commentObj).save().then(async commentFile =>{
        let {comment,commentedAt,children} = commentFile;
        Blog.findOneAndUpdate({_id},{$push:{"comments" : commentFile._id},$inc:{"activity.total_comments":1,"activity.total_parent_comments":replying_to ? 0 : 1}})
        .then(blog=>{console.log("New Comment Created!");});

        let notificationObj = {
            type: replying_to ? "reply" :"comment",
            blog:_id,
            notification_for:blog_author,
            user:user_id,
            comment:commentFile._id
        }
        if(replying_to){
            notificationObj.replied_on_comment = replying_to;
            await Comment.findOneAndUpdate({_id:replying_to},{$push:{children: commentFile._id}})
            .then(replyingToCommentDoc => {
                notificationObj.notification_for = replyingToCommentDoc.commented_by;
            })
        }
        new Notification(notificationObj).save().then(notification=>{console.log("New Notification Created")});
        return res.status(200).json({comment,commentedAt,_id:commentFile._id,user_id,children})
    })
}
const getBlogComments = async(req,res) => {
    let {blog_id,skip} = req.body;
    let maxLimit = 5;
    Comment.find({blog_id,isReply:false})
    .populate("commented_by","personal_info.username personal_info.fullname personal_info.profile_img")
    .skip(skip)
    .limit(maxLimit)
    .sort({"commentedAt":-1})
    .then(comment => {
        console.log(comment,skip,blog_id);
        return res.status(200).json(comment);
    })
    .catch(err =>{
        console.log(err);
        return res.status(500).json({error:err.message})
    })
}

const getReplies = async (req,res) => {
    let {_id,skip} = req.body;
    let maxLimit = 5;
    Comment.findOne({_id})
    .populate({
        path:"children",
        option:{
            limit:maxLimit,
            skip:skip,
            sort:{"commentAt":-1}
        },
        populate : {
            path: "commented_by",
            select : "personal_info.profile_img personal_info.fullname personal_info.username"
        },
        select:"-blog_id -updatedAt"
    })
    .select("children")
    .then(doc => {
        return res.status(200).json({replies:doc.children})
    })
    .catch(err =>{
        console.log(err);
        return res.status(500).json({error:err.message})
    })
}
const deleteComments = (_id) => {
    Comment.findOneAndDelete({_id})
    .then(comment => {
        if(comment.parent){
            Comment.findOneAndUpdate({_id:comment.parent},{$pull:{children:_id}})
            .then(data => console.log("comment deleted from parent!"))
            .catch(err => console.log(err));
        }
        Notification.findOneAndDelete({comment:_id})
        .then(notification => console.log("Notification Deleted!"))

        Notification.findOneAndDelete({reply:_id})
        .then(notification => console.log("Reply Notification Deleted!"))

        Blog.findOneAndUpdate({_id:comment.blog_id},{$pull : {comments:_id},$inc : {"activity.total_comments" : -1},"activity.total_parent_comments" : comment.parent ? 0 : -1})
        .then(blog => {
            if(comment.children.length){
                comment.children.map(replies => {
                    deleteComments(replies);
                })
            }
        })
    })
    .catch(err => {
        console.log(err.message);
    })
}
const deleteComment = (req,res) => {
    let user_id = req.user;
    let {_id} = req.body;
    Comment.findOne({_id}).then(comment => {
        if(user_id == comment.commented_by || user_id == comment.blog_author){
            deleteComments(_id);
            return res.status(200).json({"status" : "done"});
        }else{
            return res.status(403).json({"error" : "You cannot delete this comment"});
        }
    })
}

export { latestBlogs,allLatestBlogsCount,trendingBlogs,searchBlogs,searchBlogsCount,searchUsers,getProfile,createBlog,getBlog,likeBlog,isBlogLiked,addComment,getBlogComments,getReplies,deleteComment};

