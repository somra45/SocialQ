import "./TweetBox.css";
import { useDispatch } from "react-redux";
import { deleteTweet, updateTweet } from '../../store/tweets';

function TweetBox ({ tweet: { _id, body, author, date, categories }, alreadyExists}) {
  const dispatch = useDispatch();
  const { username } = author;

  const handleDelete = (e) => {
    e.preventDefault();
    const response = dispatch(deleteTweet(_id))
    debugger
    console.log(response)
    debugger
  }

  return (
    <div className="tweet">
      <h3>author: {username}</h3>
      <p>date: {date}</p>
      <p>body: {body}</p>
      <ul>categories: {categories?.map(cat => <li><b>{cat}</b></li>)}</ul>
      {alreadyExists && (
        <button onClick={handleDelete}>Delete</button>
      )}
      {/* {alreadyExists && (
        <button onClick={(e) => handleEdit(e, _id)}>Edit</button>
      )} */}
    </div>
  );
}

export default TweetBox;