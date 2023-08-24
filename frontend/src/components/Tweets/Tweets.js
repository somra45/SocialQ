import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTweetErrors, fetchTweets } from '../../store/tweets';
import TweetBox from './TweetBox';
import Calendar from "../Calendar/Calendar";
import NavBar from '../NavBar/NavBar';
import "./Tweets.css";

function Tweets () {
  const dispatch = useDispatch();
  const tweets = useSelector(state => Object.values(state.tweets.all));
  const tweetsSortedByDate = tweets?.sort((a,b) => a.date - b.date);
  useEffect(() => {
    dispatch(fetchTweets());
    return () => dispatch(clearTweetErrors());
  }, [dispatch])

  // if (tweets.length === 0) return <div>There are no Tweets</div>;
  
  return (
    <>
      {/* <h2>Welcome</h2> */}
      <NavBar/>
      {/* {tweetsSortedByDate?.map(tweet => (
        <TweetBox key={tweet._id} tweet={tweet} />
      ))} */}
    </>
  );
}

export default Tweets;