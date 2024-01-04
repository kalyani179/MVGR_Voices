import React, { useContext } from 'react'
import { EditorContext } from './Editor';
import toast,{Toaster } from 'react-hot-toast';
const BlogPublish = () => {

    let characterLimit = 200;

    let {blog,blog:{banner,title,tags,desc},setEditorState,setBlog} = useContext(EditorContext);

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

    return (
        <section className='w-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4'>
        <Toaster />
        <button className='w-12 h-12 absolute right-[5vw] z-10 top-[1%]' onClick={handleCloseEvent}>
            <i class="fi fi-br-cross-small"></i>
        </button>

        <div className='maxw-[550px] center'>
            <p className='text-dark-grey mb-1'>Preview</p>

            <div className='w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4'>
            {/* <img src={banner}/> */}
            </div>

            <h1 className='text-4xl font-medium mt-2 leading-tight line-clamp-2'>{title}</h1>

            <p className='font-gelasio line-clamp-2 leading-7 mt-4'>{desc}</p>

        </div>

        <div className="border-grey lg:border-1 lg:pl-8">
            <h3 className='text-dark-grey mt-9 mb-2'>Blog Title</h3>
            <input type="text"  placeholder='Blog Title' 
                defaultValue={title} className='input-box'
                onChange={handleBlogTitleChange}
            />

            <h3 className='text-dark-grey mt-9 mb-2'>Short Description about your Blog</h3>
            <textarea
                maxLength={characterLimit}
                defaultValue={desc}
                className="h-40 resize-none input-box pl-4 leading-7"
                onChange={handleBlogDescChange}
                onKeyDown={handleTitleKeyDown}
            ></textarea>

            <p className='mt-1 text-dark-grey text-sm text-right'>{characterLimit - desc.length} characters left</p>

            <p>
                Topics - (Helps in searching and ranking your blog post)
            </p>

            <div className="relative input-box pl-2 py-2 pb-4">
                <input type="text" placeholder="Topic"
                className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
                />
                {/* <Tag /> */}
            </div>

        </div>

        </section>
    )
}

export default BlogPublish;