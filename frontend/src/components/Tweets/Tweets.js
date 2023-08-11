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

      <div className='splash-page-container'>

        <div className='splash-inner-container'>

          <div className='team-member-container'>

            <img className="team-member-picture"src='./assets/images/Harvey.png' alt='harvey'></img>
          
            <div className='team-member-bio'>
              <h1 className='team-member-name'>Harvinder Somra</h1>
              <h2 className='team-member-role'>Project Manager</h2>
              <br/>
              <p>About Me:</p>
              <br/>
              <p>I love hiking, gaming, and traveling, pursuing my dream of  </p>
              <p>traveling the world while I contribute to making it better</p>
              <br/>
              < a href="https://github.com/somra45" class="fa-brands fa-github fa-2xl" style={{color: "#ffff",}}> </a>  < a href="https://www.linkedin.com/in/theofanis-neofotistos-483b33254/" class="fa-brands fa-linkedin fa-2xl" style={{color: "#ffff",}}> </a>
            </div>

          </div>

          <div className='team-member-container'>
                  
                  <img className="team-member-picture"src='./assets/images/Max.png' alt='harvey'></img>
                
                  <div className='team-member-bio'>
                    <h1 className='team-member-name'>Max Carpenter</h1>
                    <h2 className='team-member-role'>Full Stack Support Engineer</h2>
                    <p>About Me:</p>
                    <br/>
                    <p></p>
                    <br/>
                    < a href="https://github.com/somra45" class="fa-brands fa-github fa-2xl" style={{color: "#ffff",}}> </a>  < a href="https://www.linkedin.com/in/theofanis-neofotistos-483b33254/" class="fa-brands fa-linkedin fa-2xl" style={{color: "#ffff",}}> </a>
                  </div>
      
          </div>

          <div className='team-member-container'>
                  
                  <img className="team-member-picture"src='./assets/images/Theo.png' alt='harvey'></img>
                
                  <div className='team-member-bio'>
                    <h1 className='team-member-name'>Theofanis Neofotistos</h1>
                    <h2 className='team-member-role'>Frontend Engineer & UX/UI</h2>
                    <p>About Me:</p>
                    <br/>
                    <p></p>
                    <br/>
                    < a href="https://github.com/somra45" class="fa-brands fa-github fa-2xl" style={{color: "#ffff",}}> </a>  < a href="https://www.linkedin.com/in/theofanis-neofotistos-483b33254/" class="fa-brands fa-linkedin fa-2xl" style={{color: "#ffff",}}> </a>
                  </div>
      
          </div>

          <div className='team-member-container'>
                  
                  <img className="team-member-picture"src='./assets/images/Joe.png' alt='harvey'></img>
                
                  <div className='team-member-bio'>
                    <h1 className='team-member-name'>Joe Randazzo</h1>
                    <h2 className='team-member-role'>Backend Engineer</h2>
                    <br/>
                    <p>About Me: </p>
                      <br/>
                    <p>When I'm not playing dodgeball, I'm equally passionate about academic</p>
                    <p>pursuits and fostering meaningful connections with those around me</p>
                    <br/>
                    <p></p>
                    <br/>
                    < a href="https://github.com/somra45" class="fa-brands fa-github fa-2xl" style={{color: "#ffff",}}> </a>  < a href="https://www.linkedin.com/in/theofanis-neofotistos-483b33254/" class="fa-brands fa-linkedin fa-2xl" style={{color: "#ffff",}}> </a>
                  </div>
      
          </div>

        </div>
          
      </div>

      


      {/* {tweetsSortedByDate?.map(tweet => (
        <TweetBox key={tweet._id} tweet={tweet} />
      ))} */}
    </>
  );
}

export default Tweets;