import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { getDate } from '../../common/Date';
import { UserContext } from '../../App';
import axios from 'axios';
import toast from 'react-hot-toast';

const PodcastStats = ({stats}) => {
    return (
      <div className="flex gap-2 mb-4 pb-4 border-grey border-b lg:border-none"> 
          {
            Object.keys(stats).map((info,i)=>{
              return !info.includes("parent") ? 
              <div key={i} className={`flex flex-col items-center w-full h-full justify-center p-4 px-6 ${i!==0 ? "border-grey border-l" : ""}`}>
                  <h1 className="sm:text-lg text-xl mb-2 font-medium">{stats[info].toLocaleString()}</h1>
                  <p className="text-dark-grey capitalize">{info.split("_")[1]}</p>
              </div>
              : ""
            })
          }
      </div>
    )
}

const ManagePublishedPodcastCard = ({podcast,onClick}) => {
  const handleClick = () => {
    console.log("Clicked Podcast ID:", podcast._id); // Log the podcast_id
    onClick(podcast);
  };
  
  const { imageURL, name, publishedAt, activity,podcast_id } = podcast;
  const { userAuth: { access_token } } = useContext(UserContext);
  const [showStat, setShowStat] = useState(false);
  return (
    <>
      <div className="flex gap-10 border-b mb-6 sm:px-4 border-grey pb-6 items-center cursor-pointer"onClick={handleClick}>
        <img className="sm:hidden lg:hidden xl:block w-28 h-28 flex-none bg-grey object-cover" src={imageURL} alt="" />
        <div className="flex flex-col justify-between py-2 w-full min-w-[300px]">
            <div>
              <Link to="" className="blog-title mb-4 hover:underline">{name}</Link>
              <p className="line-clamp-1">Published on {getDate(publishedAt)}</p>
            </div>
            <div className="flex gap-6 mt-3">
                {/* /*<Link  to={`/upload`} className="pr-4 py-2 text-primary font-medium underline">Edit</Link>*/ }
                <button onClick={()=>setShowStat(!showStat)} className="lg:hidden pr-4 py-2 underline">Stats</button>
                <button onClick={(e)=>deletePodcast(podcast,access_token,e.target)} className="pr-4 py-2 underline font-medium text-red">Delete</button>
            </div>
        </div>
        <div className="sm:hidden md:hidden lg:block">
            <PodcastStats stats={activity}/>
        </div>
      </div>
      {
        showStat ? <div className="lg:hidden">
        <PodcastStats stats={activity}/>
        </div> : ""
      }
    </>
  )
}


const deletePodcast = (podcast,access_token,target) => {
  let {index,_id,setStateFunc} = podcast;
  target.setAttribute("disabled",true);
  let loadingToast = toast.loading("deleting podcast...");
  axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/delete-podcasts",{_id},{
    headers:{
      'Authorization' : `Bearer ${access_token}`
    }
  })
  .then(({data}) => {
      target.removeAttribute("disabled");
      setStateFunc(preVal => {
        let {deletedDocCount,totalDocs,results} = preVal;
        results.splice(index,1);
        if(!deletedDocCount){
          deletedDocCount=0;
        }
        if(!results.length && totalDocs-1>0){
            return null;
        }
        toast.remove(loadingToast);
        toast.success("Podcast Deleted Successfully..!");
        return {...preVal,totalDocs:totalDocs-1,deleteDocCount:deletedDocCount+1}
      })
  })
  .catch(err => {
    toast.remove(loadingToast);
    toast.error("Sorry! There is an issue in deleting the blog..Please Try Again!")
    console.log(err);
  })
}


export {ManagePublishedPodcastCard}