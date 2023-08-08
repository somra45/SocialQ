import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTweets, clearTweetErrors } from '../../store/tweets';
import TweetBox from '../Tweets/TweetBox';
import Calendar from '../Calendar/Calendar';
import NavBar from '../NavBar/NavBar';
import './Profile.css';

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userTweets = useSelector(state => Object.values(state.tweets.user))
  
  useEffect(() => {
    dispatch(fetchUserTweets(currentUser._id));
    return () => dispatch(clearTweetErrors());
  }, [currentUser, dispatch]);

  if (userTweets.length === 0) {
    return <div>{currentUser.username} has no Tweets</div>;
  } else {
    return (
      <>
        <NavBar/>
        <div className='profile-container'>

          <div className='left-container'>
            <i class="fa-regular fa-circle-user fa-2xl" style={{color: "#749bc2"}}></i>
            <h2 className='currentUserProfile'>{currentUser.username}'s Profile</h2>
            <div className='profile-subs-container'>
              
            </div>
          </div>

          <div className='middle-container'>
            <h2 className='currentUserHeader'>{currentUser.username}'s Tweets</h2>

            <div className='tweet-container'>
              {userTweets.map(tweet => (
                <div className='individual-tweet'>
                  <TweetBox
                    key={tweet._id}
                    tweet={tweet}
                    alreadyExists={true}
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
              
            </div>
          </div>

       </div>
      </>
    );
  }
}

export default Profile;