import React, { createContext, useContext,useEffect,useState } from 'react'
import { UserContext } from '../../../App';
import { useNavigate, useParams } from 'react-router-dom';
import BlogEditor from './BlogEditor';
import BlogPublish from './BlogPublish';
import Loader from '../../../common/Loader';
import axios from 'axios';

const blogStructure = {
    title : "",
    banner : "",
    content : [],
    tags : [],
    desc : "",
    author : {personal_info : {}}
}

export const EditorContext = createContext({});


const Editor = () => {

    let {blog_id} = useParams();

    const navigate = useNavigate();

    const [blog,setBlog] = useState(blogStructure);
    const [editorState,setEditorState] = useState("editor");
    const [textEditor,setTextEditor] = useState({isReady : false})
    const [loading,setLoading] = useState(true);

    let {userAuth:{access_token}} = useContext(UserContext);

    useEffect(()=>{
        if(!blog_id){
            return setLoading(false);
        }
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/get-blog",{blog_id,draft:true,mode:"edit"})
        .then(({data :{blog}})=>{
            setBlog(blog);
            setLoading(false);
        })
        .catch(err=>{
            setBlog(null);
            setLoading(false);
        })
    },[])

    return (
        <>
        <EditorContext.Provider value={{blog,setBlog,editorState,setEditorState,textEditor,setTextEditor}}>
        {
            !access_token ? 
            navigate("/")
            :
            loading ? <Loader /> : 
            editorState === "editor" ? <BlogEditor /> : <BlogPublish />
        }
        </EditorContext.Provider>
        </>
    )
}

export default Editor;