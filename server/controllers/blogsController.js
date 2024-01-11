import { nanoid } from "nanoid";

import Blog from "../models/BlogSchema.js";
import User from "../models/UserSchema.js"

const latestBlogs = async (req,res) =>{

    let maxLimit = 3;

    await Blog.find({draft:false})
    .populate("author","personal_info.profile_img personal_info.username personal_info.fullname -_id")
    .sort({"publishedAt":-1})
    .select("blog_id title desc banner activity tags publishedAt -_id")
    .limit(maxLimit)
    .then( blogs => {
        return res.status(200).json({blogs});
    })
}

const createBlog = async (req, res) => {
    try{
        let authorID = req.user;
        let {title,desc,banner,tags,content,draft} = req.body;
    
        if(!title.length){
            return res.status(403).json({error:"You Must Provide a Title to publish the blog"});
        }
        if(!draft){
            if(!desc.length || desc.length>200){
                return res.status(403).json({error:"You Must Provide a Blog Description Under 200 Characters"});
            }
            // if(!banner.length){
            //     return res.status(403).json({error:"You Must Provide a Blog Banner to publish the blog"})
            // }
            if(!content.blocks.length){
                return res.status(403).json({error:"You Must Write Something To Publish it!"})
            }
            if(!tags.length || tags.length>10){
                return res.status(403).json({error:"Provide tags in order to publish the blog, Maximum 10"});
            }
        }
        
        tags = tags.map(tag => tag.toLowerCase());
    
        let blog_id = title.replace(/[^a-zA-z0-9]/g,' ').replace(/\s+/g,"-").trim()+nanoid();
    
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
    catch(err){
        return res.status(500).json({error:err.message});
    }
    
}

export { latestBlogs,createBlog };
