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
        <LoadingPage type={'spinningBubbles'} color={'#91C8E4'} height={'23vh'} width={'23vw'} />
      </div>
      </>
      )}
  
  return (
    <>
      <NavBar/>
      <div id='tweets-full-page-div'>
        <div className='navbar-instructions-div'>
          <h1 className='navbar-instructions-header'>Navigation</h1>
          <div className='navbar-instruction'>
            <i className="fa-solid fa-home fa-2xl" style={{color: "#4682A9"}}></i>
            <p className='icon-instruction'>This button navigates you back to this page, where you can view all of your tweets as well as all the tweets from users you are subscribed to!</p>
          </div>
          <div className='navbar-instruction'>
            <i className="fa-solid fa-user fa-2xl" style={{color: "#4682A9"}}></i>
            <p className='icon-instruction'>This button navigates you back to your profile page, where you can see your scheduled and past tweets; in a feed and calendar, and some analytic information.</p>
          </div>
          <div className='navbar-instruction'>
            <i className="fa-solid fa-calendar-days fa-2xl" style={{color: "#4682A9"}}></i>
            <p className='icon-instruction'>This button navigates you to a big calendar to allow you to manage your tweets and when they are scheduled by dragging the tweet to a future date.</p>
          </div>
          <div className='navbar-instruction'>
            <i className="fa-solid fa-info fa-2xl" style={{color: "#4682A9"}}></i>
            <p className='icon-instruction'>This button navigates you to the About Us page, where you can find more information about the development team!</p>
          </div>
        </div>
            <div className='middle-container'>
                <h2 className='currentUserHeader'>{currentUser.username}'s Feed</h2>
                  {tweetFeed.length === 0 ? 
                    (<div className='loading-div'>
                      <LoadingPage type={'spinningBubbles'} color={'#91C8E4'} />
                    </div>) 
                    :
                    (<div className='tweet-feed-container'>
                      {tweetsSortedByDate.map(tweet => (
                        <div className='individual-tweet' key={`allTweets${tweet._id}`}>
                          <TweetBox
                            key={`tweetBox_${tweet._id}`}
                            tweet={tweet}
                            alreadyExists={new Date(tweet.date)<new Date()}
                            userOwnTweet = {tweet.author._id === currentUser._id}
                          />
                        </div>
                      ))}
                    </div>
                    )
                  }
            </div>
            <div className='right-container'>
              <div className='ai-instruction'>
                <i className="fa-solid fa-circle-plus fa-2xl" style={{color: "#4682A9"}}></i>
                <p className='icon-instruction'>This button navigates you to a page to use AI to generate and schedule a new tweet, based on what you want the tweet to be about. The AI can be provided with moods in the form of categories that will determine how your tweet is crafted. You can also upload images and videos, and you can provide desscriptions of these images/videos that will help the AI to curate a post fit for you! </p>
              </div>
            </div>
      </div>
    </>
  );
}

export default Tweets;