import React, { useState, useContext } from 'react';
import axios from 'axios';
import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { UserContext } from '../../../App.jsx';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { storage } from "../../../common/firebase.jsx";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
const UploadPodcast = () => {
    const { userAuth: { access_token } } = useContext(UserContext);
    const navigate = useNavigate();
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [songImageCover, setSongImageCover] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(0);
    const [isAudioLoading, setIsAudioLoading] = useState(false);
    const [audioImageCover, setAudioImageCover] = useState(null);
    const [audioUploadProgress, setAudioUploadProgress] = useState(0);
    const [songName, setSongName] = useState("");
    const [songDescription, setSongDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const categories = [
        "Business", "Religion/Culture", "History", "Education", "Health", "Comedy",
        "News", "Science", "Development", "Sports", "Crime", "Horror"
    ];

    const handleUpload = (e) => {
        e.preventDefault();
        // Check if required fields are empty
        if (!access_token) {
            return toast.error("Access token not found");
        }

        if (!songName) {
            return toast.error("Please provide a name for the podcast");
        }

        if (!songDescription) {
            return toast.error("Please provide a description for the podcast");
        }

        if (!songImageCover) {
            return toast.error("Please upload an image for the podcast");
        }

        if (!audioImageCover) {
            return toast.error("Please upload an audio file for the podcast");
        }

        if (!selectedCategory) {
            return toast.error("Please select a category for the podcast");
        }

        let loadingToast = toast.loading("publishing...");
        const headers = { Authorization: `Bearer ${access_token}` };
        axios.post(process.env.REACT_APP_SERVER_DOMAIN + '/api/pod/save', {
            name: songName,
            description: songDescription,
            imageURL: songImageCover,
            songURL: audioImageCover,
            category: selectedCategory,
        }, { headers: headers })
            .then((result) => {
              toast.dismiss(loadingToast);
              toast.success("Podcast Published Successfully..!");
              setTimeout(()=>{
                  navigate("/podcasts");
              },500);
            })
            .catch((err) => console.log(err));

        // Reset state after successful upload
        setSongName('');
        setSongDescription('');
        setIsAudioLoading(false);
        setIsImageLoading(false);
        setAudioImageCover(null);
        setSongImageCover(null);
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
      <div className="bg-cool-white">
      <div className="center flex-col gap-8 h-screen">
        <h1 className="font-medium text-primary/90 sm:text-center sm:text-base md:text-2xl tracking-wide">Upload Your Podcast and Let Your Voice Be Heard!</h1>
        <div className='flex flex-col items-center bg-white justify-start p-6 rounded md:h-3/4 md:w-3/4 '>
        <div className=" sm:flex-col flex w-full mb-4">
          <input
            type="text"
            placeholder="Podcast Name"
            className="sm:mb-4 sm:w-full w-1/2 p-3 rounded-md text-base font-semibold placeholder:font-medium text-textColor outline-none shadow-sm border border-gray-300 bg-transparent mr-2"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
          {/* Dropdown menu for category filtering */}
          <select
            className="select-category sm:w-full w-1/2 p-3 rounded-md text-base font-semibold outline-none shadow-sm border border-gray-300 bg-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
      <div className='sm:flex-col flex mb-4 w-full md:h-60'>
      <Toaster />
          <div className='bg-card backdrop-blur-md w-full md:h-full rounded-md border-2 border-dotted border-gray-300
            cursor-pointer self-start mr-2 sm:mb-4'>
              
              {isImageLoading && <FileLoader progress={imageUploadProgress} />}
              {!isImageLoading &&(
                <>
                {!songImageCover ?( <FileUploader updateState={setSongImageCover}
                setProgress ={setImageUploadProgress} isLoading={setIsImageLoading} isImage={true}
                />):(
                  <div className=" relative w-full md:h-full overflow-hidden rounded-md">
                  <img
                    src={songImageCover}
                    alt=""
                    className="w-full sm:h-40  md:h-full object-cover "
                    
                  />
                  <button
                        type="button"
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red sm:text-base md:text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
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
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red sm:text-base md:text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
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
            className='w-full p-3 rounded-md text-base font-medium placeholder:font-medium 
            text-textColor outline-none shadow-sm border border-gray-300 bg-transparent mb-4'
           // onChange={(e)=>setDescription(e.target.value)}
            onChange={(e) => setSongDescription(e.target.value)}
          />
        <button className="btn-purple px-8" onClick={handleUpload}>Upload</button>
        
        
      </div>
      </div>
      </div>
    );
  };

  const FileLoader = ({ progress }) => {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-xl font-medium text-textColor">
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
        <div className='flex flex-col items-center justify-center h-full font-inter'>
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
