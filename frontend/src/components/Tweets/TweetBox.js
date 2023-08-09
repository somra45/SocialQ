import "./TweetBox.css";
import { useDispatch } from "react-redux";
import { deleteTweet, updateTweet } from '../../store/tweets';

function TweetBox ({ tweet: { _id, body, author, date, categories,likeCount, retweetCount }, alreadyExists}) {
  const dispatch = useDispatch();
  const { username } = author;

  const convertTime = (timestamp) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    timestamp = timestamp.slice(0, 16);
    let month = months[parseInt(timestamp.slice(5, 7)) - 1];
    return `${timestamp.slice(11,16)} ${month} ${timestamp.slice(8,10)}, ${timestamp.slice(0,4)}`;
  }
  
  return (
    <div className="tweet">
      <h3 className="tweet-author">{username}</h3>
      <br/>
      <p className="tweet-body">{body}</p>
      <div className="tweet-category-container">
        <ul className="tweet-categories">{categories?.map(cat => <li><b>{cat}&nbsp;</b></li>)} </ul>
      </div>
      <br/>
      <p className="tweet-date">{convertTime(date)}</p>
      <div>
        <p>{likeCount}</p>
        <p>{retweetCount}</p>
      </div>

    </div>
  );
}

export default TweetBox;