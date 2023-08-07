import "./TweetBox.css"

function TweetBox ({ tweet: { body, author }}) {
  const { username } = author;
  return (
    <div className="tweet">
      <h3>{username}</h3>
      <p>{body}</p>
    </div>
  );
}

export default TweetBox;