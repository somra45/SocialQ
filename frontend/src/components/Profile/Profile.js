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
          <h2>All of {currentUser.username}'s Tweets</h2>
          {userTweets.map(tweet => (
            <TweetBox
              key={tweet._id}
              tweet={tweet}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Profile;