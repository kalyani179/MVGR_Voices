import React, { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import defaultBanner from "../../assets/images/Blogs/default_banner.png"
import Animation from "../../common/Animation";

import { EditorContext } from "./Editor";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./BlogTools";
import {Toaster,toast} from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../../App";

const BlogEditor = () => {

  let {blog,blog:{title,banner,content,tags,desc},setBlog,textEditor,setTextEditor,setEditorState} = useContext(EditorContext);

  let {userAuth:{access_token}} = useContext(UserContext);

  let navigate = useNavigate();

  useEffect(() => {
    if(!textEditor.isReady){
      setTextEditor(new EditorJS({
        holder : "textEditor",
        data : content,
        tools: tools,
        placeholder : "Let's write an awesome story"
      }))
    }
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
  const handleSaveDraft = (e) =>{
            // To prevent user submitting the blog more than once
          if(e.target.className.includes('disable')){ 
              return;
          }
          if(!title.length){
              return toast.error("You Must Provide a Title before saving it as a draft!");
          }

          let loadingToast = toast.loading("saving draft...");
  
          e.target.classList.add('disable');
  
          
          if(textEditor.isReady){
            textEditor.save().then(content => {
              let blogObj = {
                title, banner, desc, content, tags, draft:true
              }
              textEditor.save().then(content => {
                axios.post("http://localhost:3000/create-blog",blogObj,{
                  headers:{
                      'Authorization' : `Bearer ${access_token}`
                  }
              }).then(()=>{
                  e.target.classList.remove('disable');
                  toast.dismiss(loadingToast);
                  toast.success("Blog Saved Successfully...");
                  setTimeout(()=>{
                      navigate("/");
                  },500);
              }).catch(({response})=>{
                  e.target.classList.remove('disable');
                  toast.dismiss(loadingToast);
                  return toast.error(response.data.error);
              })
              })
            })
            
  }}
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
          <button className="btn-purple py-2" onClick={handleSaveDraft}>Save Draft</button>
        </div>
      </nav>
      <Animation>
      <section>
        <div className="mx-auto max-w-[900px] w-full">
          <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner">
                  <img src={defaultBanner} className="z-20" alt="Default Banner"/>
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
            placeholder="Blog Title"
            className="w-full h-20 text-4xl font-medium outline-none resize-none mt-10 leading-tight placeholder:opacity-60"
            onKeyDown={handleTitleKeyDown}
            onChange={handleTitleChange}
          ></textarea>

          <hr className="w-full opacity-10 mb-5"/>

          <div id="textEditor" className="font-gelasio"></div>

        </div>
      </section>
      </Animation>
    </>
  )
}

export default BlogEditor;