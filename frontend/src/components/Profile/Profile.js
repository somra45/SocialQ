import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTweets, clearTweetErrors } from '../../store/tweets';
import TweetBox from '../Tweets/TweetBox';
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

          <div className='left-container'>Left container</div>

          <div className='middle-container'>
            <h2 className='currentUserHeader'>{currentUser.username}'s Tweets</h2>

            <div className='tweet-container'>
              {userTweets.map(tweet => (
                <div className='individual-tweet'>
                  <TweetBox
                    key={tweet._id}
                    tweet={tweet}
                  />
                </div>
              ))}
            </div>

          </div>

          <div className='right-container'>right container</div>
          
        </div>
      </>
    );
  }
}

export default Profile;