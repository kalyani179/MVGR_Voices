import Blog from "../models/BlogSchema.js";
import User from "../models/UserSchema.js"

const userWrittenBlogs = (req,res) => {
    let user_id = req.user;
    let {page,draft,query,deletedDocCount} = req.body;

    let maxLimit = 5;
    let skipDocs = (page-1) * maxLimit;

    if(deletedDocCount){
        skipDocs -= deletedDocCount;
    }
    Blog.find({author:user_id,draft,title:new RegExp(query,'i')})
    .skip(skipDocs)
    .limit(maxLimit)
    .sort({publishedAt:-1})
    .select("title banner publishedAt blog_id activity desc draft -_id")
    .then(blogs => {
        return res.status(200).json({blogs});
    })
    .catch(err => {
        return res.status(500).json({error:err.message});
    })
}

const userWrittenBlogsCount = (req,res) => {
    let user_id = req.user;
    let {draft,query} = req.body;
    Blog.countDocuments({author:user_id,draft,title:new RegExp(query,'i')})
    .then(count=>{
        return res.status(200).json({totalDocs:count});
    })
    .catch(err => {
        return res.status(500).json({error:err.message});
    })
}

export {userWrittenBlogs,userWrittenBlogsCount};