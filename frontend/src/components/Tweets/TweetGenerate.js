import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTweetErrors, composeTweet } from '../../store/tweets';
import TweetBox from './TweetBox';
import NavBar from '../NavBar/NavBar';
import jwtFetch from '../../store/jwt';
import { fetchGeneration } from '../../store/aiBody';
import './TweetGenerate.css'
import {WithContext as ReactTags} from 'react-tag-input'

const suggestions = [].map((string) => {
  return {
    name: string
  };
});

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


function TweetGenerate () {
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

  const [tags, setTags] = useState([
    { id: 'Sexy', text: 'Sexy' },
    { id: 'Dark', text: 'Dark' },
    { id: 'Businesslike', text: 'Businesslike' },
    { id: 'Promotional', text: 'Promotional' },
  ]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked');
  };


  useEffect(() => {
    return () => dispatch(clearTweetErrors());
  }, [dispatch]);

  // const handleGenerate = e => {
  //   e.preventDefault();
  //   dispatch(composeTweet({ body })); 
  //   setBody('');
  // };

  useEffect(() => {
    if (triggerGeneration && userInstructions) {
      const fetchGeneration = (instructions) => async () => {
        try {
            const res = await jwtFetch(`/api/aiFetch`, {
                method: "POST",
                body: JSON.stringify({"instructions": instructions})
            })
            const aiBody = await res.json();
            debugger
            setGeneratedBody(aiBody);
          } catch (err) {
            debugger
          }
      }
      let categoryString = ""
      let mediaDescString = ""
      if (tags.length > 0) {
        categoryString = tags.map(tag => tag.text).join(", ")
      }
      if (mediaDescArray.length > 0) {
        mediaDescString = mediaDescArray.join(", ")
      }
      const aiInstructions =
        `Please respond to this with a tweet written according to the following instructions: ${userInstructions}.
        ${categoryString ? `Also, please write the tweet so that its tone and content lines up with all of the following categories: ${categoryString}` : ""}
        ${mediaDescString ? `Also, keep in mind that photos/videos with the following descriptions will be attached to the tweet: ${mediaDescString}` : ""}`
      debugger
      fetchGeneration(aiInstructions)();
    }
    if (triggerGeneration) setTriggerGeneration(false);
  }, [triggerGeneration])

  const update = (e) => {
    setUserInstructions(e.currentTarget.value);
  }

  return (
    <>
      <NavBar/>
      <div className='generateTweetContainer'>
        <div className='generateTweetContainerTop'>
          <div className='generateLeft'>
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
            <div className='generateTags'>
                  <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
            editable
          />
          </div>

          </div>
          <div className='generateMiddle'>   
          
                <textarea
                rows="9"
                cols="20"
                wrap='soft'
                className='generated-tweet-body'
                type="textarea"
                value={generatedBody}
                required
                />

            

              </div>
          <div className='generateRight'>       </div>
          </div>

          <div className='generateTweetContainerBottom'>
            <div className='bottomButtonsLeft'>        <button>Reset Form</button></div>
            <div className='bottomButtonsMiddle'> <button 
              className="generateButton"
              onClick={() => {setTriggerGeneration(true)}}>Regenerate</button></div>
            <div className='bottomButtonsRight'><button>Schedule Tweet</button> </div>
          </div>

            
          
      </div>
    </>
  )
}

export default TweetGenerate;