import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTweets, clearTweetErrors, fetchTweets } from '../../store/tweets';
import {subscribeToUser, unsubscribeFromUser} from '../../store/subscriptions';
import { useParams, Link } from 'react-router-dom/';
import TweetBox from '../Tweets/TweetBox';
import Calendar from '../Calendar/Calendar';
import NavBar from '../NavBar/NavBar';
import './OtherUserProfile.css';
import BarChart from '../BigCalendar/BarChart';
import LoadingPage from '../LoadingPage';

function OtherUserProfile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userTweets = useSelector(state => Object.values(state.tweets.user))
  const author = Object.values(userTweets)[0]?.author
  const tweetsSortedByDate = userTweets?.map(tweet => tweet).sort((a,b) => new Date(b.date) - new Date(a.date));
  const {username} = useParams();
  const [isSubscribed,setIsSubscribed] = useState(false);


  // const subscribedUsers = useSelector(state => state.currentPagesubscriptions ? Object.values(state.currentPagesubscriptions.users) : null)
  // const subscribedCategories = useSelector(state => state.currentPagesubscriptions ? Object.values(state.currentPagesubscriptions.categories) : null)

  useEffect(() => {
    for (const subbedUser of Object.values(currentUser.subscriptions.users)) {
      if (subbedUser.username === username) {
        setIsSubscribed(true);
        break; // Exit the loop when the condition is met
      }
    }
  }, [])

  useEffect(() => {
    dispatch(fetchUserTweets(username));
    dispatch(clearTweetErrors());
  }, [username, dispatch]);

  const handleSubscribe = () => {
    if (isSubscribed) {
      dispatch(unsubscribeFromUser(username))
    } else {
      dispatch(subscribeToUser(username)
    )}
    setIsSubscribed(!isSubscribed)
  }
  
    return (
      <>
        <NavBar/>
        <div id='editModal' className='hide-edit-modal'></div>
        {userTweets.length === 0 ? 
            (<div className='loading-div'>
              <LoadingPage type={'spinningBubbles'} color={'#91C8E4'} />
            </div>) 
            :
            (
            <div className='user-profile-container'>
              <div className='middle-container'>
                <h2 className='currentUserHeader'>{author.username}'s Tweets</h2>
                <div className='profile-page-image-sub'>
                  <div className='profile-image-button-div'>
                  {author.profileImageUrl ? 
                      <img className="user-profile-image-main" src={author.profileImageUrl} alt="profile"/> :
                        undefined
                  }
                  <button className='subscribe-button' onClick={handleSubscribe}>{isSubscribed ? 'Unsubscribe' : 'Subscribe'}</button>
                  </div>
                    <div className='profile-tweet-container'>
                  {tweetsSortedByDate.map(tweet => (
                    <div className='individual-tweet' key={tweet._id} id={tweet._id}>
                      <TweetBox
                        key={tweet._id}
                        tweet={tweet}
                        alreadyExists={new Date(tweet.date)<new Date()}
                        userOwnTweet={false}
                      />
                    </div>
                  ))}
                  </div>
                  
                </div>
                <div className='profile-stats-container'>
                  <BarChart userTweets={userTweets} />
                </div>
              </div>

              <div className='right-container'>
                  < Calendar />
              </div>
              </div>
          )}
      </>
    );           
}

export default OtherUserProfile;