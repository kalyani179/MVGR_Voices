import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote"
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

import { storage} from "../../../common/firebase";
import { ref,getDownloadURL,uploadBytesResumable } from "firebase/storage";

const uploadImageByFile = (e) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `Blog_Images/${Date.now()}-${e.name}`);
        const uploadTask = uploadBytesResumable(storageRef, e);

        uploadTask.on("state_changed", 
            (snapshot) => {
                // Upload progress can be monitored here if needed
            },
            (error) => {
                console.log("Error during upload:", error);
                reject(error); // Reject the promise if there's an error
            },
            () => {
                // Upload completed successfully
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        console.log("Image uploaded successfully:", url);
                        resolve({ success: 1, file: { url } }); // Resolve the promise with the uploaded image URL
                    })
                    .catch(err => {
                        console.log("Error getting download URL:", err);
                        reject(err); // Reject the promise if there's an error in getting the download URL
                    });
            }
        );
    });
};


const uploadImageByUrl = (e) => {
    let link = new Promise((resolve,reject) => {
        try{
            resolve(e);
        }
        catch(err) {
            reject(err);
        }
    })
    return link.then( url => {
        return {
            success : 1,
            file : {url}
        }
    })
}

export const tools = {
    embed : Embed,
    list : {
        class : List,
        inlineToolbar : true
    },
    image : {
        class:Image,
        config:{
            uploader:{
                uploadByUrl : uploadImageByUrl,
                uploadByFile : uploadImageByFile
            }
        }
    },
    header : {
        class : Header,
        config:{
            placeholder : "Heading...",
            levels : [2,3],
            defaultLevel : 2
        }
    },
    quote : {
        class : Quote,
        inlineToolbar : true
    },
    marker : Marker,
    inlineCode : InlineCode
}