import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTweetErrors, composeTweet } from '../../store/tweets';
import TweetBox from './TweetBox';
import './TweetCompose.css';
import NavBar from '../NavBar/NavBar';
import jwtFetch from '../../store/jwt';

function TweetCompose () {
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const author = useSelector(state => state.session.user);
  const newTweet = useSelector(state => state.tweets.new);
  const errors = useSelector(state => state.errors.tweets);
  const [userInstructions,setUserInstructions] = useState("");
  // const [aiInstructions,setAiInstructions] = useState("");
  const [generatedBody,setGeneratedBody] = useState("");
  const [categoryArray,setCategoryArray] = useState([]);
  const [mediaDescArray,setMediaDescArray] = useState([]);
  const [triggerGeneration,setTriggerGeneration] = useState(false);


  useEffect(() => {
    return () => dispatch(clearTweetErrors());
  }, [dispatch]);

  // const handleGenerate = e => {
  //   e.preventDefault();
  //   dispatch(composeTweet({ body })); 
  //   setBody('');
  // };

  useEffect(() => {
    console.log(triggerGeneration)
    console.log(userInstructions)
    if (triggerGeneration && userInstructions) {
      const fetchGeneration = async (instructions) => {
        const res = await jwtFetch(`/api/aiFetch`, {
          method: "POST",
          body: instructions
        })
        if (res.ok) {
          setGeneratedBody(res)
        }
      }
      let categoryString = ""
      let mediaDescString = ""
      if (categoryArray.length > 0) {
        categoryString = categoryArray.join(", ")
      }
      if (mediaDescArray.length > 0) {
        mediaDescString = mediaDescArray.join(", ")
      }
      const aiInstructions =
        `Please respond to this with a tweet written according to the following instructions: ${userInstructions}.
        ${categoryString ? `Also, please write the tweet so that its tone and content lines up with all of the following categories: ${categoryString}` : ""}
        ${mediaDescString ? `Also, keep in mind that photos/videos with the following descriptions will be attached to the tweet: ${mediaDescString}` : ""}`
      debugger
      fetchGeneration(aiInstructions);
      // dispatch(composeTweet({body: aiInstructions}))
    }
    if (triggerGeneration) setTriggerGeneration(false);
  }, [triggerGeneration])

  const update = (e) => {
    setUserInstructions(e.currentTarget.value);
  }

  return (
    <>
      <NavBar/>
      <div className='composeTweetContainer'>

        <div className='compose-tweet-area'>

            <textarea
              rows="9"
              cols="20"
              wrap='soft'
              className='compose-tweet-input'
              type="textarea"
              value={userInstructions}
              onChange={update}
              placeholder="Give us a brief description of how you would like your Tweet to sound"
              required
            />
            {generatedBody && (
              <textarea
              rows="4"
              cols="20"
              wrap='soft'
              className='generated-tweet-body'
              type="textarea"
              value={generatedBody}
              required
              />
            )}

            <div className="errors">{errors?.text}</div>

            {/* UNDER THIS IS WHERE THE TAGS FORM WILL GO  */}

            {/* <div>
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

                <div className="errors">{errors?.text}</div>


            </div> */}
            
            {/* BEFORE THIS IS WHERE TAGS WILL GO */}
            <button  className="generateButton" onClick={() => {setTriggerGeneration(true)}}>{ generatedBody ? "Regenerate" : "Generate"}</button>

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