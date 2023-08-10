import "./TweetBox.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteTweet, updateTweet, getTweet } from '../../store/tweets';

function TweetBox ({ tweet: { _id, body, author, date, categories,likeCount, retweetCount }, alreadyExists}) {
  const dispatch = useDispatch();
  const { username } = author;
  const currentTweet = useSelector(getTweet(_id));
  const [showModal, setShowModal] = useState(false)
  const [tweetBody, setTweetBody] = useState(body)

  const convertTime = (timestamp) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    timestamp = timestamp.slice(0, 16);
    let month = months[parseInt(timestamp.slice(5, 7)) - 1];
    return `${timestamp.slice(11,16)} ${month} ${timestamp.slice(8,10)}, ${timestamp.slice(0,4)}`;
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
  }
  return (
    <>
    <div className="tweet">
      <h3 className="tweet-author">{username}</h3>
      <br/>
      <p className="tweet-body">{body}</p>
      <div className="tweet-category-container">
        <ul className="tweet-categories">{categories?.map(cat => <li><b>{cat}&nbsp;</b></li>)} </ul>
      </div>
      <br/>
      <p className="tweet-date">{convertTime(date)}</p>
      <br/>
      <div className="tweet-icons">
        <p className="tweet-icon-row"><i class="fa-solid fa-heart"> {likeCount}</i>&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-retweet"> {retweetCount}</i></p>
        <p></p>
      <button onClick={()=>setShowModal(!showModal)}>Edit</button>
      <button onClick={e=>handleDelete(e)}>Delete</button>
    </div>

    <div className={showModal ? `show-modal` : `hide-modal`}>
      Update Tweet
      <input type='textarea' value={tweetBody} onChange={e=>setTweetBody(e.target.value)}></input>
      <button onClick={e=>handleUpdate(e)}>Update</button>
      <button onClick={()=>setShowModal(!showModal)}>Cancel</button>
    </div>
    </>
  );
}

export default TweetBox;