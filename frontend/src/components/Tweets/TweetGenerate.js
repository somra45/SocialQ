import { useEffect, useState, useRef } from 'react';
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
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const fileRef = useRef(null);
  const displayedImages = imageUrls?.map((url, index) => {
    return <img className="tweet-image" key ={url} src={url} alt={`tweetImage${index}`} />
  });

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

  const updateFiles = async e => {
    const files = e.target.files;
    setImages(files);
    if (files.length !== 0) {
      let filesLoaded = 0;
      const urls = [];
      Array.from(files).forEach((file, index) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          urls[index] = fileReader.result;
          if (++filesLoaded === files.length) 
            setImageUrls(urls);
        }
      });
    }
    else setImageUrls([]);
  }

  const handleGenerate = e => {
    e.preventDefault();
    dispatch(composeTweet({body, images})); 
    setImages([]);                        
    setImageUrls([]); 
    setBody('');
    fileRef.current.value = null;
  };

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
              <label>
                Images to Upload
                <input
                  type="file"
                  ref={fileRef}
                  accept=".jpg, .jpeg, .png"
                  multiple
                  onChange={updateFiles} />
              </label>
            <div className='generateTags'>
                  <ReactTags
            className="tag-buttons"
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

                <div className='tweet-header-container'>
                  <p className='tweet-preview-header'>{author.twitterHandle}     <i class="fa-solid fa-circle-check"></i></p>
                  <p className='tweet-preview-header-2'>@{author.twitterHandle}</p>
                  <div className='tweet-header-ellipsis'><i class="fa-solid fa-ellipsis"></i></div>
                </div>   

              {/* <div className='tweet-replica-container'> */}
                <textarea
                rows="9"
                cols="20"
                wrap='soft'
                className='generated-tweet-body'
                type="textarea"
                value={generatedBody}
                required
                />
                
                <div className="generated-tweet-images">
                  {(imageUrls.length !== 0) ?                  
                  displayedImages : // <-- MODIFY THIS LINE
                  undefined}
                </div>
              {/* </div> */}

              <div className='twitter-icons'>
                <p><i class="fa-solid fa-comment"> 0</i></p>
                <p><i class="fa-solid fa-retweet"> 0</i></p>
                <p><i class="fa-solid fa-heart"> 0</i></p>
                <p><i class="fa-solid fa-chart-simple"> 0</i></p>
                <p><i class="fa-solid fa-arrow-up-from-bracket"></i></p>
              </div>

            

          </div>
          
          
          <div className='generateRight'>       </div>
          </div>

          <div className='generateTweetContainerBottom'>
            <div className='bottomButtonsLeft'>        <button className='resetButton'>Reset Form</button></div>
            <div className='bottomButtonsMiddle'> <button 
              className="generateButton"
              onClick={() => {setTriggerGeneration(true)}}>Regenerate</button></div>
            <div className='bottomButtonsRight'><button className='scheduleTweetButton'>Schedule Tweet</button> </div>
          </div>

            
          
      </div>
    </>
  )
}

export default TweetGenerate;