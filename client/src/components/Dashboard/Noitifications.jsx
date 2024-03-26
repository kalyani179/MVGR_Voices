import React,{useState,useContext, useEffect} from 'react'
import { UserContext } from "../../App";
import { ThemeContext } from "../../App";
import axios from 'axios';
import FilterPaginationData from '../../common/FilterPaginationData';
import Loader from '../../common/Loader';
import NoBlogsDataMessage from '../../common/NoDataMessage';
import Animation from '../../common/Animation';
import NotificationCard from './NotificationCard';
import LoadMoreDataBtn from '../../common/LoadMoreDataBtn';
import { SyncLoader } from 'react-spinners';
const Noitifications = () => {
    const [filter, setFilter] =useState('all');
    let filters=['all','like','comment','reply'];
    const { theme } = useContext(ThemeContext);
    let { userAuth,userAuth :{access_token,new_notification_available},setUserAuth} = useContext(UserContext);
    const [notifications,setNotifications]=useState(null);

    const fetchNotifications=({page,deletedDocCount=0})=>{
        axios.post(process.env.REACT_APP_SERVER_DOMAIN +"/notifications",{page,filter,deletedDocCount},{
            headers:{
                'Authorization':`Bearer ${access_token}`
            }
        })
        .then(async ({data:{notifications:data}})=>{

            if(new_notification_available){
                setUserAuth({...userAuth,new_notification_available:false})
            }

            let formatedData= await FilterPaginationData({
                state:notifications,
                data,page,
                countRoute:"/all-notifications-count",
                data_to_send:{filter},
                user:access_token

            })

            setNotifications(formatedData);
            console.log(formatedData);
        })
        .catch(err=>{
            console.log(err);
        })

    }

    useEffect(()=>{
        if(access_token){
            fetchNotifications({page:1})
        }
    },[access_token,filter])

    const handleFilter=(e)=>{
        let btn=e.target;
        setFilter(btn.innerHTML);
        setNotifications(null);
    }

  return (
    <div className="md:ml-56 mt-24 sm:ml-5 sm:center flex-col">
        {/* <h1 className='max-md:hidden'> Recent Notifications </h1> */}
        <div className='mb-5 flex gap-3'>
            {
                filters.map((filterName,i)=>{
                    return <button key={i}className={`tag md:py-2 ${filter===filterName ? 
                        (theme === "light" ? "bg-primary text-white font-medium" : "bg-primary text-darkBlack font-medium") : ""}`} 
                        onClick={ handleFilter}>{filterName}
                    </button>

                })
            }

        </div>

        {
            notifications===null?
            <div className="center">
                <SyncLoader color="#f59a9a" margin={4} size={13} />
            </div>
            :
            <>
                {
                    notifications.results.length?
                        notifications.results.map((notification,i)=>{
                            return <Animation key={i} transition={{delay:i*0.08}}>
                                    <NotificationCard data={notification} index={i} 
                                    notificationState={{notifications,setNotifications}} />
                                </Animation>

                    })
                    :<NoBlogsDataMessage message="Nothing available"/>


                }
                <LoadMoreDataBtn state={notifications} fetchDataFunc={fetchNotifications}
                additionalParam={{deletedDocCount:notifications.deletedDocCount}}  />
            </>
        }
    </div>
  )
}

export default Noitifications
