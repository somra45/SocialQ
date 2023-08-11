import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTweets, clearTweetErrors, fetchTweets } from '../../store/tweets';
import TweetBox from '../Tweets/TweetBox';
import Calendar from '../Calendar/Calendar';
import NavBar from '../NavBar/NavBar';
import './Profile.css';
import BarChart from '../BigCalendar/BarChart';

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userTweets = useSelector(state => Object.values(state.tweets.user))
  const tweetsSortedByDate = userTweets?.map(tweet => tweet).sort((a,b) => a.date - b.date);


  
  useEffect(() => {
    dispatch(fetchUserTweets(currentUser._id));
    return () => dispatch(clearTweetErrors());
  }, [currentUser, dispatch]);

  if (userTweets.length === 0) {
    return <div>{currentUser.username} has no Tweets</div>;
  } else {
  
  // const userSubs = Object.values(useSelector(state => state.tweets.subscribed)) <-----QUESTION FOR JOE
  // if (userTweets.length === 0) {
  //   return <div>{currentUser.username} has no Tweets</div>;
  // } else {
    return (
      <>
        <NavBar/>
        <div id='editModal' className='hide-edit-modal'></div>
        <div className='profile-container'>

          <div className='left-container'>
          {currentUser.profileImageUrl ? 
            <img className="profile-image-main" src={currentUser.profileImageUrl} alt="profile"/> :
            undefined
          }
            <h2 className='currentUserProfile'>{currentUser.username}'s Profile</h2>
            <div className='profile-subs-container'>
              <h1 className='subs-header'>Subscribers</h1>
              <br/>
              <p className='subs'>@Peter-GPT</p>
              <br/>
              <p className='subs'>@Amin-B-RightBack</p>
              <br/>
              <p className='subs'>@SteveTheDream</p>
              <br/>
              <p className='subs'>@ClarenceS</p>
              <br/>
              <p className='subs'>@MaxCarp</p>
              <br/>
              <p className='subs'>@HarveyS</p>
              <br/>
              <p className='subs'>@TheoNeo23</p>
              <br/>
              <p className='subs'>@JoeRandazzleme</p>
              <br/>
              <p className='subs'>@HulkHoganBrother</p>
              <br/>
              <p className='subs'>@Cher</p>
            {/* {userSubs && userSubs.map(subscriber => (   
                <p>{subscriber.author.twitterHandle}</p>
                ))} */}
            </div>
          </div>

          <div className='middle-container'>
            <h2 className='currentUserHeader'>{currentUser.username}'s Tweets</h2>

            <div className='tweet-container'>
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

       </div>
      </>
    );
              }
}

export default Profile;