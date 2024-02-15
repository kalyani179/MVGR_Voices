import React, { useContext } from "react"
import { EditorContext } from "./Editor";
import {Toaster,toast} from "react-hot-toast";
import defaultBanner from "../../assets/images/Blogs/default_banner.png";
import BlogTags from "./BlogTags";

import Animation from "../../common/Animation";
import axios from "axios";
import { UserContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

const BlogPublish = () => {

    let {blog_id} = useParams();

    let characterLimit = 200;
    let tagsLimit = 10;
    let navigate = useNavigate();

    let {blog,blog:{banner,title,tags,desc,content},setEditorState,setBlog} = useContext(EditorContext);
    let {userAuth:{access_token}} = useContext(UserContext);

    const handleCloseEvent = () =>{
        setEditorState("editor");
    }
    
    const handleBlogTitleChange = (e) =>{
        let input = e.target;
        setBlog({...blog,title:input.value});
    }

    const handleBlogDescChange = (e) => {
        let input = e.target;
        setBlog({...blog,desc:input.value});
    }

    const handleTitleKeyDown = (e) =>{
        if(e.keyCode === 13){ // Enter key
            e.preventDefault();
        }
    }

    const handleKeyDown = (e) => {
        if(e.keyCode === 13 || e.keyCode === 188){ // Enter key or Comma key
            e.preventDefault();

            let tag = e.target.value;

            if(tags.length < tagsLimit){
                if(!tags.includes(tag) && tag.length){
                    console.log(tags);
                    setBlog({...blog,tags:[...tags,tag]})
                }
            }else{
                toast.error(`You Can add max ${tagsLimit} Tags`)
            }

            e.target.value = "";
        }
    }

    const handlePublish = (e) => {
        // To prevent user submitting the blog more than once
        if(e.target.className.includes('disable')){ 
            return;
        }
        if(!title.length){
            return toast.error("You Must Provide a Title to publish the blog");
        }
        if(!desc.length || desc.length > characterLimit){
            return toast.error("You Must Provide a Blog Description Under 200 Characters");
        }
        if(!tags.length || tags.length>10){
            return toast.error("Provide tags in order to publish the blog, Maximum 10");
        }

        let loadingToast = toast.loading("publishing...");

        e.target.classList.add('disable');

        let blogObj = {
            title, banner, desc, content, tags, draft:false
        }

        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/create-blog",{...blogObj,id:blog_id}, {
            headers:{
                'Authorization' : `Bearer ${access_token}`
            }
        }).then(()=>{
            e.target.classList.remove('disable');
            toast.dismiss(loadingToast);
            toast.success("Blog Published Successfully...");
            setTimeout(()=>{
                navigate("/blogs");
            },500);
        }).catch(({response})=>{
            e.target.classList.remove('disable');
            toast.dismiss(loadingToast);
            return toast.error(response.data.error);
        })
    }

    return (
        <Animation>
            <section className="min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-10">
            <Toaster />
            <button className="w-12 h-12 absolute right-[2vw] z-10 top-[5%]" onClick={handleCloseEvent}>
                <i class="fi fi-br-cross"></i>
            </button>

            <div className="max-w-[550px] block mx-auto">
                <p className="text-dark-grey mb-1">Preview</p>

                <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
                    <img src={defaultBanner} alt="Blog Banner"/> {/* remove later */}
                </div>

                <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">{title}</h1>

                <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">{desc}</p>

            </div>

            <div className="border-grey lg:border-1 lg:pl-8">

                <p className="blog-label">Blog Title</p>
                <input type="text"  placeholder="Blog Title" 
                    defaultValue={title} className="input-box"
                    onChange={handleBlogTitleChange}
                />

                <p className="blog-label">Short Description about your Blog</p>

                <textarea
                    maxLength={characterLimit}
                    defaultValue={desc}
                    className="h-40 resize-none input-box pl-4 leading-7"
                    onChange={handleBlogDescChange}
                    onKeyDown={handleTitleKeyDown}
                ></textarea>

                <p className="mt-1 text-dark-grey text-sm text-right">{characterLimit - desc.length} characters left</p>

                <p className="blog-label">
                    Topics - (Helps in searching and ranking your blog post)
                </p>

                <div className="relative input-box pl-2 py-2 pb-4">
                    <input type="text" placeholder="Topic"
                    className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
                    onKeyDown={handleKeyDown}
                    />

                    {
                        tags.map((tag,i)=>{
                            return <BlogTags key={i} tagIndex={i} tag={tag}/>
                        })
                    }

                </div>

                <p className="mt-1 mb-4 text-dark-grey text-sm text-right">{tagsLimit-tags.length} Tags left</p>

                <button className="btn-purple px-8" onClick={handlePublish}>Publish</button>

            </div>

            </section>
        </Animation>
    )
}

export default BlogPublish;