import React,{useState} from 'react'
import axios from 'axios';
import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import {storage} from  "C:/MyLearning/MVGR_Voices/client/src/common/firebase.jsx"
import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "./api";
const UploadPodcast = () => {
    //const [name, setName]=useState()
    //const [description, setDescription]=useState()

    const [isImageLoading,setIsImageLoading]=useState(false);
    const [songImageCover,setSongImageCover]=useState(null);
    const [imageUploadProgress,setImageUploadProgress]=useState(0);

    const [isAudioLoading,setIsAudioLoading]=useState(false);
    const [audioImageCover,setAudioImageCover]=useState(null);
    const [audioUploadProgress,setAudioUploadProgress]=useState(0);
    const [songName, setSongName] = useState("");
    const [songDescription, setSongDescription] = useState("");
   // const [songI, setSongDescription] = useState("");
    //const [songImageUrl, setSongImageUrl] = useState(null);
    //const [audioAsset, setAudioAsset] = useState(null);
    //const [allSongs, setAllSongs] = useState([]);
    /*const handleUpload=(e)=>{
        /*e.preventDefault();
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/api/pod/save",{name,description,songImageUrl,audioAsset}, { timeout: 5000 })
        .then(result=>console.log(result))
        .catch(err=>console.log(err))*/
       /* axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/api/pod/save", {
          name: songName,
          description: songDescription,
          songImageUrl: songImageCover,
          audioAsset: audioImageCover,
        })
        .then(result => console.log(result))
        .catch(err => console.log(err));
        if(!songImageCover ||!audioImageCover){
          //throw alert
        }else{
          setIsAudioLoading(true);
          setIsImageLoading(true);
        
            const data = {
              name: songName,
              imageURL: songImageCover,
              songUrl: audioImageCover,
              description:songDescription,
            };
            saveNewSong(data).then((res) => {
              getAllSongs().then((songs) => {
                setAllSongs(songs);
                //console.log(songs);
              });
            });
          }  
    };*/
    const handleUpload = (e) => {
      e.preventDefault();
      if(!songImageCover ||!audioImageCover){
        //throw alert
      }else{
        setIsAudioLoading(true);
        setIsImageLoading(true);
        axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/api/pod/save", {
          name: songName,
          description: songDescription,
          imageURL: songImageCover,
          songURL: audioImageCover,
        })
        .then(result => {
          console.log(result);
          // Add any further logic you need after successful upload
        })
        .catch(err => console.log(err));
      }
      setSongName(null);
      setIsAudioLoading(false);
      setIsImageLoading(false);
      setAudioImageCover(null);
      setSongImageCover(null);
      setSongDescription(null);
    };
    const deleteImageObject = (url,isImage) => {
      if(isImage){
        setIsImageLoading(true);
        setIsAudioLoading(true);
       
      }
      const deleteRef=ref(storage,url);
      deleteObject(deleteRef).then(()=>{
        setSongImageCover(null);
        setAudioImageCover(null);
        setIsImageLoading(false); 
        setIsAudioLoading(false);
      });
      
    };
    return (
      <div className="flex items-center justify-center h-screen">
        <div className='flex flex-col items-center justify-start p-4 border border-gray-300 rounded h-3/4 w-3/4'>
          <input
            type="text"
            placeholder='Podcast Name'
            className='w-full p-3 rounded-md text-base font-semibold 
            text-textColor outline-none shadow-sm border border-gray-300 bg-transparent mb-4'
            //onChange={(e)=>setName(e.target.value)}
            onChange={(e) => setSongName(e.target.value)}
          />
       
       <div className='flex mb-4 w-full h-full'>
          <div className='bg-card backdrop-blur-md w-full h-full rounded-md border-2 border-dotted border-gray-300
            cursor-pointer self-start mr-2'>
              {isImageLoading && <FileLoader progress={imageUploadProgress} />}
              {!isImageLoading &&(
                <>
                {!songImageCover ?( <FileUploader updateState={setSongImageCover}
                setProgress ={setImageUploadProgress} isLoading={setIsImageLoading} isImage={true}
                />):(
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                  <img
                    src={songImageCover}
                    alt=""
                    className="w-full h-full object-cover"
                    
                  />
                  <button
                        type="button"
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                        onClick={() => {
                          deleteImageObject(songImageCover, true);
                        }}
                      >
                        <MdDelete className="text-white" />
                      </button>
                  
                </div>
                 )}
                 </>
                                 
              )}
            </div>
            <div className='bg-card backdrop-blur-md w-full h-full rounded-md border-2 border-dotted border-gray-300
            cursor-pointer self-start mr-2'>
              {isAudioLoading && <FileLoader progress={audioUploadProgress} />}
              {!isAudioLoading &&(
                <>
                {!audioImageCover ?( <FileUploader updateState={setAudioImageCover}
                setProgress ={setAudioUploadProgress} isLoading={setIsAudioLoading} isImage={false}
                />):(
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md">
                  <audio src={audioImageCover} controls ></audio>
                  <button
                        type="button"
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                        onClick={() => {
                          deleteImageObject(audioImageCover, true);
                        }}
                      >
                        <MdDelete className="text-white" />
                      </button>
                  
                </div>
                 )}
                 </>
                                 
              )}
            </div>
          </div>
          
        <input
            type="text"
            placeholder='Description'
            className='w-full p-3 rounded-md text-base font-semibold  
            text-textColor outline-none shadow-sm border border-gray-300 bg-transparent mb-4'
           // onChange={(e)=>setDescription(e.target.value)}
           onChange={(e) => setSongDescription(e.target.value)}
          />
        <button className="btn-purple px-8" onClick={handleUpload}>Upload</button>
        
        
      </div>
      </div>
    );
  };

  const FileLoader = ({ progress }) => {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-xl font-semibold text-textColor">
          {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
        </p>
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </div>
    );
  };
  
  export const FileUploader =({ updateState,setProgress,isLoading,isImage})=>{
    const uploadFile=(e)=>{
      isLoading(true);
      const uploadedFile=e.target.files[0];
      //console.log(uploadedFile);
      //isLoading(false);
      const storageRef = ref(
        storage,
        `${isImage ? "Images" : "Audios"}/${Date.now()}-${uploadedFile.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
  
        (error) => {
         console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            updateState(downloadUrl);
            isLoading(false);
          });
        }
      );
    
    };
    return(
      <label>
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='flex flex-col justify-center items-center cursor-pointer'>
            <p className='font-bold text-2xl'> <BiCloudUpload /></p>
            <p className='text-lg'>Click to upload {isImage ?"an image":"an audio"}</p>
          </div>
        </div>
        <input type="file" name="upload-file" accept={`${isImage ?"image/*" :"audio/* "}`} 
        className={"w-0 h-0"} onChange={uploadFile}></input>
      </label>
    )
  }

export default UploadPodcast
