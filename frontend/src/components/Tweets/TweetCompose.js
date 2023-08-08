import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTweetErrors, composeTweet } from '../../store/tweets';
import TweetBox from './TweetBox';
import './TweetCompose.css';
import NavBar from '../NavBar/NavBar';

function TweetCompose () {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const author = useSelector(state => state.session.user);
  const newTweet = useSelector(state => state.tweets.new);
  const errors = useSelector(state => state.errors.tweets);

  useEffect(() => {
    return () => dispatch(clearTweetErrors());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(composeTweet({ text })); 
    setText('');
  };

  const update = e => setText(e.currentTarget.value);

  return (
    <>
      <NavBar/>
      <div className='composeTweetContainer'>

        <div className='compose-tweet-area'>

          <form className="compose-tweet" onSubmit={handleSubmit}>
            <textarea
              rows="9"
              cols="20"
              wrap='soft'
              className='compose-tweet-input'
              type="textarea"
              value={text}
              onChange={update}
              placeholder="Give us a breif description of how you would like your Tweet to sound"
              required
            />

            <div className="errors">{errors?.text}</div>

            {/* UNDER THIS IS WHERE THE TAGS FORM WILL GO  */}

            <div>
              <form className="tag-area" onSubmit={handleSubmit}>
                <input 
                  type="checkbox"
                  value=""
                  onChange={update}
                  placeholder="Write your tweet..."
                  required
                />
                <input 
                  type="checkbox"
                  value=""
                  onChange={update}
                  placeholder="Write your tweet..."
                  required
                /> <input 
                type="checkbox"
                value=""
                onChange={update}
                placeholder="Write your tweet..."
                required
                /> 

                {/* this is where the extra tags will be */}
              



                
                
                
                 {/* this is where the extra tags will be */}


                <div className="errors">{errors?.text}</div>


              </form>
                <input className="addTagsButton"type="submit" value="Add Tags" />
            </div>
            
            {/* BEFORE THIS IS WHERE TAGS WILL GO */}
            <input  className="generateButton"type="submit" value="GENERATE" />

          </form>
        </div>

        

        

        {/* <div className="tweet-preview">
          <h3>Tweet Preview</h3>
          {text ? <TweetBox tweet={{text, author}} /> : undefined}
        </div> */}
        
        {/* <div className="previous-tweet">
          <h3>Previous Tweet</h3>
          {newTweet ? <TweetBox tweet={newTweet} /> : undefined}
        </div> */}
      </div>
    </>
  )
}

export default TweetCompose;