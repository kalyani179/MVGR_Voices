import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom";
import defaultBanner from "../../assets/images/Blogs/default_banner.png"

import { EditorContext } from "./Editor";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./BlogTools";
import {Toaster,toast} from "react-hot-toast";

const BlogEditor = () => {

  let {blog,blog:{title,banner,content,tags,desc},setBlog,textEditor,setTextEditor,setEditorState} = useContext(EditorContext);

  useEffect(() => {
    setTextEditor(new EditorJS({
      holder : "textEditor",
      data : content,
      tools: tools,
      placeholder : "Let's write an awesome story"
    }))
  }, [])

  const handleBannerUpload = (e) =>{
    let img = e.target.files[0];
    console.log(img);
  }
  const handleTitleKeyDown = (e) =>{
    if(e.keyCode === 13){ // Enter key
      e.preventDefault();
    }
  }
  const handleTitleChange = (e) =>{
    let input = e.target;

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog({...blog,title:input.value})
  }

  const handlePublishEvent = () =>{
    // if(!banner.length){
    //   return toast.error("Upload a Blog Banner To publish IT!");
    // }

    if(!title.length){
      return toast.error("Write Blog Title To Publish IT!");
    }

    if(textEditor.isReady){
      textEditor.save().then(data => {
        if(data.blocks.length){
          setBlog({...blog,content:data});
          setEditorState("publish");
        }else{
          return toast.error("Write something in your blog to publish it!")
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }
  return (
    <>
      <nav className="navbar">
      <Toaster />
        <Link to="/" className="flex-none w-10">
          {/* <img src={logo} alt="" /> */}
        </Link>
        <p className="line-clamp-1 w-full">
          {title.length ? title : "New Blog"}
        </p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-purple py-2" onClick={handlePublishEvent}>Publish</button>
          <button className="btn-purple py-2">Save Draft</button>
        </div>
      </nav>
      <section>
        <div className="mx-auto max-w-[900px] w-full">
          <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner">
                  <img src={defaultBanner} className="z-20" alt="default blog banner"/>
                  <input
                    id="uploadBanner"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    hidden
                    onChange={handleBannerUpload}
                  />
              </label>
          </div>
          <textarea
            defaultValue={title}
            placeholder="blog-title"
            className="w-full h-20 text-4xl font-medium outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
            onKeyDown={handleTitleKeyDown}
            onChange={handleTitleChange}
          ></textarea>

          <hr className="w-full opacity-10 mb-5"/>

          <div id="textEditor" className="font-gelasio px-0 mx-0">

          </div>
        </div>
        
      </section>
    </>
  )
}

export default BlogEditor;