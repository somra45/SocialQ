import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTweetErrors, fetchCategoryTweets } from '../../store/tweets';
import {subscribeToCategory, unsubscribeFromCategory} from '../../store/subscriptions';
import { useParams, Link } from 'react-router-dom/';
import TweetBox from '../Tweets/TweetBox';
import Calendar from '../Calendar/Calendar';
import NavBar from '../NavBar/NavBar';
import './TweetsByCategory.css';
import BarChart from '../BigCalendar/BarChart';
import LoadingPage from '../LoadingPage';

function TweetsByCategory () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const categoryTweets = useSelector(state => state.tweets.category ? Object.values(state.tweets.category) : null)
  const tweetsSortedByDate = categoryTweets?.map(tweet => tweet).sort((a,b) => new Date(b.date) - new Date(a.date));
  const {category} = useParams();
  const [isSubscribed,setIsSubscribed] = useState(false);

  useEffect(() => {
    for (const subbedCategory of Object.values(currentUser.subscriptions.categories)) {
      if (subbedCategory.name === category) {
        setIsSubscribed(true);
        break; // Exit the loop when the condition is met
      }
    }
  }, [])

  useEffect(() => {
    dispatch(fetchCategoryTweets(category));
    dispatch(clearTweetErrors());
  }, [category, dispatch]);

  const handleSubscribe = () => {
    if (isSubscribed) {
      dispatch(unsubscribeFromCategory(category))
    } else {
      dispatch(subscribeToCategory(category)
    )}
    setIsSubscribed(!isSubscribed)
  }
  
    return (
      <>
        <NavBar/>
        <div id='editModal' className='hide-edit-modal'></div>
        {categoryTweets?.length === 0 ? 
            (<div className='loading-div'>
              <LoadingPage type={'spinningBubbles'} color={'#91C8E4'} />
            </div>) 
            :
            (<div className='profile-container'>

              <div className='middle-container'>
                <h2 className='currentUserHeader'>Tweets with the category #{category}</h2>
                      <button className='subscribe-button' onClick={handleSubscribe}>{isSubscribed ? 'Unsubscribe' : 'Subscribe'}</button>
                <div className='tweet-container'>
                  {tweetsSortedByDate?.map(tweet => (
                    <div className='individual-tweet' key={tweet._id} id={tweet._id}>
                      <TweetBox
                        key={tweet._id}
                        tweet={tweet}
                        alreadyExists={new Date(tweet.date)<new Date()}
                        userOwnTweet = {tweet.author._id === currentUser._id}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className='right-container'>
                <div className='theos-calendar-container'>
                < Calendar categoryTweets={categoryTweets} />
                </div>

                <h1 className='stats-header'>Category Stats</h1>
                <div className='stats-container'>
                  <BarChart userTweets={categoryTweets} />
                </div>
              </div>

        </div>)}
      </>
    );           
}

export default TweetsByCategory;