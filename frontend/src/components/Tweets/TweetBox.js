import "./TweetBox.css"

function TweetBox ({ tweet: { body, author, date, categories }}) {
  const { username } = author;
  return (
    <div className="tweet">
      <h3>author: {username}</h3>
      <p>date: {date}</p>
      <p>body: {body}</p>
      <ul>categories: {categories?.map(cat => `<li>${cat}</li>`)}</ul>
    </div>
  );
}

export default TweetBox;