import React, { createContext, useContext,useState } from 'react'
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import BlogEditor from './BlogEditor';
import BlogPublish from './BlogPublish';

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
    const navigate = useNavigate();

    const [blog,setBlog] = useState(blogStructure);
    const [editorState,setEditorState] = useState("editor");
    const [textEditor,setTextEditor] = useState({isReady : false})

    let {userAuth:{access_token}} = useContext(UserContext);

    return (
        <EditorContext.Provider value={{blog,setBlog,editorState,setEditorState,textEditor,setTextEditor}}>
        {
            !access_token ? navigate("/")
            : editorState === "editor" ? <BlogEditor /> : <BlogPublish />
        }
        </EditorContext.Provider>
        
    )
}

export default Editor;