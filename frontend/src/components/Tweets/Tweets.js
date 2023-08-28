import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTweetErrors, fetchTweets } from '../../store/tweets';
import TweetBox from './TweetBox';
import Calendar from "../Calendar/Calendar";
import NavBar from '../NavBar/NavBar';
import LoadingPage from '../LoadingPage';
import "./Tweets.css";

function Tweets () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const tweetFeed = useSelector(state => state.tweets.subscribed ? Object.values(state.tweets.subscribed) : []);
  const tweetsSortedByDate = tweetFeed?.sort((a,b) => new Date(b.date) - new Date(a.date));

  useEffect(() => {
    dispatch(fetchTweets());
    return () => dispatch(clearTweetErrors());
  }, [dispatch])

  if (tweetsSortedByDate.length === 0) { return (
      <>
      <div className='loading-div'>
        <LoadingPage type={'spinningBubbles'} color={'#91C8E4'} />
      </div>
      </>
      )}
  
  return (
    <>
      {/* <h2>Welcome</h2> */}
      <NavBar/>
      <section className='tweet-feed-container'>
          <div className='middle-container'>
                <h2 className='currentUserHeader'>{currentUser.username}'s Feed</h2>
                {tweetFeed.length === 0 ? 
                  (<div className='loading-div'>
                    <LoadingPage type={'spinningBubbles'} color={'#91C8E4'} />
                  </div>) 
                  :
                  (<div className='tweet-feed-container'>
                    {tweetsSortedByDate.map(tweet => (
                      <div className='individual-tweet'>
                        <TweetBox
                          key={tweet._id}
                          tweet={tweet}
                          alreadyExists={true}
                        />
                      </div>
                    ))}
                  </div>
                  )
                }
          </div>
      </section>
    </>
  );
}

export default Tweets;