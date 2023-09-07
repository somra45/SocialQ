import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserTweets, clearTweetErrors, fetchTweets } from '../../store/tweets';
import TweetBox from '../Tweets/TweetBox';
import Calendar from '../Calendar/Calendar';
import NavBar from '../NavBar/NavBar';
import './Profile.css';
import BarChart from '../BigCalendar/BarChart';
import LoadingPage from '../LoadingPage';

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userTweets = useSelector(state => Object.values(state.tweets.user))
  const subscribedUsers = useSelector(state => Object.values(state.subscriptions.users))
  const subscribedCategories = useSelector(state => Object.values(state.subscriptions.categories))
  const tweetsSortedByDate = userTweets?.map(tweet => tweet).sort((a,b) => new Date(b.date) - new Date(a.date));


  
  useEffect(() => {
    dispatch(fetchUserTweets(currentUser._id));
    return () => dispatch(clearTweetErrors());
  }, [currentUser, dispatch]);

  
    return (
      <>
        <NavBar/>
        <div id='editModal' className='hide-edit-modal'></div>
        {userTweets.length === 0 ? 
            (<div className='loading-div'>
              <LoadingPage type={'spinningBubbles'} color={'#91C8E4'} />
            </div>) 
            :
            (<div className='profile-container'>
                <div className='left-container'>
                  {currentUser.profileImageUrl ? 
                      <img className="profile-image-main" src={currentUser.profileImageUrl} alt="profile"/> :
                        undefined
                  }
                  <h2 className='currentUserProfile'>{currentUser.username}'s Profile</h2>
                  <div className='profile-subs-container'>
                  <h1 className='subs-header'>Subscriptions</h1>
                  <br/>
                  <h2 className='subscribed-users'>Users</h2>
                    {subscribedUsers && subscribedUsers.map(user => (   
                      <p><Link target='_blank' to={`/users/${user._id}`}>@{user.username}</Link></p>
                    ))}

                  <br/>
                  <h2 className='subscribed-categories'>Categories</h2>
                  {subscribedCategories && subscribedCategories.map(category => (   
                      <p>#{category.name}</p>
                    ))}
                </div>
              </div>

              <div className='middle-container'>
                <h2 className='currentUserHeader'>{currentUser.username}'s Tweets</h2>

                <div className='tweet-container'>
                  {tweetsSortedByDate.map(tweet => (
                    <div className='individual-tweet' key={tweet._id} id={tweet._id}>
                      <TweetBox
                        key={tweet._id}
                        tweet={tweet}
                        alreadyExists={new Date(tweet.date)<new Date()}
                        userOwnTweet = {true}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className='right-container'>
                <div className='theos-calendar-container'>
                < Calendar />
                </div>

                <h1 className='stats-header'>{currentUser.username}'s Stats</h1>
                <div className='stats-container'>
                  <BarChart userTweets={userTweets} />
                </div>
              </div>

        </div>)}
      </>
    );           
}

export default Profile;