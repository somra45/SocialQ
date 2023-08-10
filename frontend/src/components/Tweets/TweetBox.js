import "./TweetBox.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteTweet, updateTweet, getTweet } from '../../store/tweets';
import SelectEditDateCalendar from "./SelectEditDateCalendar.js";


const TweetBox = ({ tweet: { _id, body, author, date, categories,likeCount, retweetCount, mediaUrls }, alreadyExists}) => {
  const dispatch = useDispatch();
  const { username } = author;
  // const currentUser = useSelecor
  const currentTweet = useSelector(getTweet(_id));
  const [showModal, setShowModal] = useState(false)
  const [tweetBody, setTweetBody] = useState(body)
  const [showSelect, setShowSelect] = useState(false);
  // const displayedImages = (mediaUrls ? map((url, index) => {
  //   return <img className="tweet-image" key ={url} src={url} alt={`tweetImage${index}`} />
  // });)

  const separateMediaTags = () => {
    const imageTags = () => {
      if (mediaUrls.images) {
        Object.values(mediaUrls.images).map((image) => {
          return <img className='tweet-image' key={image.url} src={image.url} alt={image.desc} />
        })
      } else return (<></>)
    }

    const videoTags = () => {
      if (mediaUrls.videos) {
        return Object.values(mediaUrls.videos).map((video) => {
          let videoTag = (<video className='tweet-video' key={video.url} alt={video.desc} controls>
                              <source src={video.url} type="video/mp4" />
                          </video>)
          return videoTag
        })
      } else return (<></>)
    }

    return(
      <>
      {imageTags()}
      {videoTags()}
      </>
    )
  }

  const displayedMedia = mediaUrls ? separateMediaTags() : (<></>)

  const convertTime = (timestamp) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    timestamp = timestamp.slice(0, 16);
    let month = months[parseInt(timestamp.slice(5, 7)) - 1];
    return `${timestamp.slice(11,16)} ${month} ${timestamp.slice(8,10)}, ${timestamp.slice(0,4)}`;
  }

  const handleOpenEdit = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
    let parentModal = document.getElementById('editModal');
    parentModal.classList.add('show-edit-modal');
    parentModal.classList.remove('hide-edit-modal');

  }

  const showEditDeleteIfInFuture = () => {
    if (new Date(date)>new Date()) {
      return(
        <>
        <div className="update-button-div">
           <button className='edit-button' onClick={handleOpenEdit}>Edit</button>
          <button className="edit-button" onClick={e=>handleDelete(e)}>Delete</button>
        </div>
       
        </>
      )} else return(<></>)
    }

  const showTweetStatsIfInPast = () => {
    if (new Date(date)<new Date()) {
      return(
        <div className="tweet-icons">
          <p className="tweet-icon-row"><i class="fa-solid fa-heart"> {likeCount}</i>&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-retweet"> {retweetCount}</i></p>
          <p></p>
        </div>
      )} else return(<></>)
  }

  

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteTweet(_id))
  }
  
  const handleUpdate = (e) => {
    e.preventDefault()
    currentTweet.body = tweetBody;
    dispatch(updateTweet(currentTweet))
    setShowModal(!showModal)
    let parentModal = document.getElementById('editModal');
    parentModal.classList.add('hide-edit-modal');
    parentModal.classList.remove('show-edit-modal');
  }

  const handleCancelUpdate = (e) => {
    setShowModal(!showModal)
    let parentModal = document.getElementById('editModal');
    parentModal.classList.add('hide-edit-modal');
    parentModal.classList.remove('show-edit-modal');
  }

  const handleScheduleTime = (e) => {
    setShowSelect(!showSelect);
  }

  return (
    <>
    < SelectEditDateCalendar showSelect={showSelect}/>
    <div className={showModal ? `show-modal` : `hide-modal`}>
      <div className="update-outer-div">
        <h1 className='update-header' >Update Tweet</h1>
        <textarea className="edit-input-body" value={tweetBody} onChange={e=>setTweetBody(e.target.value)} rows='12' cols='10' wrap='soft'></textarea>
      </div>
      <div className="edit-button-div">
          <button className="update-button" onClick={handleScheduleTime}>Schedule</button>
          <button className='update-button' onClick={e=>handleUpdate(e)}>Confirm Update</button>
          <button className='update-button' onClick={handleCancelUpdate}>Cancel</button>
        </div>
    </div>
    
    <div className="tweet">
      <div className="tweet-box-header-container">
          {author.profileImageUrl ? 
            <img className="profile-image" src={author.profileImageUrl} alt="profile"/> :
            undefined
          }
          
          <h3 className="tweet-author">{username}</h3>&nbsp;<i class="fa-solid fa-circle-check"></i>&nbsp;
          <p className="tweet-auther-handle"> @{username}</p>
        
      </div>
      <br/>
      <p className="tweet-body">{body}</p>
      <div className="tweet-category-container">
        <ul className="tweet-categories">{categories?.map(cat => <li><b>{cat}&nbsp;</b></li>)} </ul>
      </div>
      <br/>
      <p className="tweet-date">{convertTime(date)}</p>
      <br/>
      {displayedMedia}
      {showTweetStatsIfInPast()}
      {showEditDeleteIfInFuture()}
    </div>
    </>
  );
}

export default TweetBox;