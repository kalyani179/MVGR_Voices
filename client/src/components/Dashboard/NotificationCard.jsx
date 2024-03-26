import React, { useContext, useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getDate } from '../../common/Date';
import NotificationCommentField from './NotificationCommentField';
import { UserContext } from '../../App';
import axios from 'axios';

const NotificationCard = ({ data, index, notificationState }) => {
    const {
        type,
        reply,
        replied_on_comment,
        comment,
        createdAt,
        blog,
        podcast,
        user,
        seen,
        _id: notification_id
    } = data;

    let { userAuth: { username: author_username, profile_img: author_profile_img, access_token } } = useContext(UserContext);

    let [isReplying, setIsReplying] = useState(false);

    let { notifications, notifications: { results, totalDocs }, setNotifications } = notificationState;
   
    const handleReplyClick = () => {
        setIsReplying(preVal => !preVal);
    }

    const handleDelete = (comment_id, type, target) => {
        target.setAttribute("disabled", true);
        axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/delete-comment", { _id: comment_id }, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(() => {
                if (type === "comment") {
                    results.splice(index, 1);
                } else {
                    delete results[index].reply;
                }
                target.removeAttribute("disabled");
                setNotifications({
                    ...notifications,
                    results,
                    totalDocs: totalDocs - 1,
                    deletedDocCount: notifications.deletedDocCount + 1
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    let { fullname, username, profile_img } = (data.user && data.user.personal_info) || {};
    const [podcastName, setPodcastName] = useState("");
    let { _id, blog_id, title } = (data.blog || {});
    let {Id,podcast_id,name}=(data.podcast ||{});

    return (
        <div className={'p-6 border-b border-grey border-l-black '+(!seen?"border-l-2":"")}>
            <div className='flex gap-5 mb-3'>
                <img src={profile_img} className='w-14 h-14 flex-none rounded-full' />
                <div className='w-full'>
                    <h1>
                        <Link to={`/user/${username}`} className='mx-1 text-black underline'>@{username}</Link>
                        <span className='font-normal'>
                            {type === 'like' ? "Liked your Blog" : type === 'like-podcast' ? "Liked your Podcast":type === 'comment' ? "commented on" : "replied on"}
                        </span>
                    </h1>
                    {
                        type === "reply" ?
                            <div className='p-4 mt-4 rounded-md bg-grey'>
                                <p>{replied_on_comment.comment}</p>
                            </div> :
                         type === "like-podcast" ?
                         podcast &&(
                         <Link to="" className='font-medium text-dark-grey hover:underline line-clamp-1'>{`"${name}"`}</Link>)
                         :
                            blog && (
                                <Link to={`/blog/${blog_id}`} className='font-medium text-dark-grey hover:underline line-clamp-1'>{`"${title}"`} </Link>
                            )
                    }

                </div>

            </div>

            {
                    (type !== 'like' && type !== 'like-podcast' && comment)?
                        <p className='ml-14 pl-5 font-gelasio text-xl my-5 '>{comment.comment}</p> : null
            }

            <div className='ml-14 pl-5 text-dark-grey flex gap-8 '>
                <p>{getDate(createdAt)}</p>
                {
                   ( type !== 'like'&& type !=='like-podcast' )&&
                    <>
                        {
                            !reply &&
                            <button className='underline hover:text-black ' onClick={handleReplyClick}> Reply</button>
                        }
                        <button className='underline hover:text-black ' onClick={(e) => handleDelete(comment._id, "comment", e.target)}>Delete</button>
                    </>
                }

            </div>

            {
                isReplying &&
                <div className='mt-8'>
                    <NotificationCommentField _id={_id} blog_author={user} index={index} replyingTo={comment._id}
                        setIsReplying={setIsReplying} notification_id={notification_id} notificationData={notificationState} />
                </div>
            }

            {
                reply &&
                <div className='ml-20 p-5 bg-grey mt-5 rounded-mg'>
                    <div className='flex gap-3 mb-3'>
                        <img src={author_profile_img} className='w-8 h-8 rounded-full ' />
                        <div>
                            <h1 className='font-medium text-xl text-dark-grey'>
                                <Link to={`/user/${author_username}`} className='mx-1 text-black underline '>@{author_username}</Link>
                                <span className='font-normal'> replied to </span>
                                <Link to={`/user/${username}`} className='mx-1 text-black underline'>@{username}</Link>
                            </h1>
                        </div>

                    </div>
                    <p className='ml-14 font-gelasio text-xl my-2 '>{reply.comment}</p>
                    <button className='underline hover:text-black ml-14 mt-2 ' onClick={(e) => handleDelete(comment._id, "comment", e.target)}>Delete</button>
                </div>
            }
        </div>
    );
}

export default NotificationCard;
