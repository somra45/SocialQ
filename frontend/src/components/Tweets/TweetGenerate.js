import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTweetErrors, composeTweet, fetchUserTweets } from '../../store/tweets';
import TweetBox from './TweetBox';
import NavBar from '../NavBar/NavBar';
import jwtFetch from '../../store/jwt';
import { fetchGeneration } from '../../store/aiBody';
import './TweetGenerate.css'
import {WithContext as ReactTags} from 'react-tag-input'
import SelectDateCalendar from '../SelectDateCalendar/SelectDateCalendar';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import LoadingPage from '../LoadingPage';



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
  const [showSelect, setShowSelect] = useState(false);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const fileRef = useRef(null);
  const [showGeneratedTweet,setShowGeneratedTweet] = useState(false);
  const history = useHistory();
  const [generateError, setGenerateError] = useState(false);
  const [scheduleDateError, setScheduledDateError] = useState(false);

  const [displayedImages,setDisplayedImages] = useState(imageUrls?.map((url, index) => {
    const styleObject = {
      backgroundImage: `url(${url})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }
    return <div className="tweet-image" key={url} style={styleObject} alt={`tweetImage${index}`} />
  }))

  useEffect(() => {
    const imagesDiv = document.querySelector(".generated-tweet-images")
    if (imageUrls.length === 1) {
      if (imagesDiv) imagesDiv.style.gridTemplateColumns = "1fr";
    } else {
      if (imagesDiv) imagesDiv.style.gridTemplateColumns = "1fr 1fr";
    }
    if (imageUrls.length === 3) {
      setDisplayedImages(imageUrls?.map((url, index) => {
        let styleObject = {
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }
        if (index === 0) {
          return (
            <>
              <div className="tweet-image" key ={url} style={styleObject} alt={`tweetImage${index}`} />
              <div className="threet-image">
                {imageUrls.map((url,index) => {
                  if (index !== 0) {
                    styleObject = {
                      backgroundImage: `url(${url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }
                    return (
                    <div className="small-tweet-image" key ={url} style={styleObject} alt={`tweetImage${index}`} />
                    )
                  }
                })}
              </div>
            </>
          )
        }
      }))
    } else if (imageUrls.length === 4) {
      setDisplayedImages(imageUrls?.map((url, index) => {
        let styleObject = {
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }
        if (index === 0) {
          return (
            <>
              <div className="threet-image">
                {imageUrls.map((url,index) => {
                  if (index === 0 || index === 1) {
                    styleObject = {
                      backgroundImage: `url(${url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }
                    return (
                    <div className="small-tweet-image" key ={url} style={styleObject} alt={`tweetImage${index}`} />
                    )
                  }
                })}
              </div>
              <div className="threet-image">
                {imageUrls.map((url,index) => {
                  if (index === 2 || index === 3) {
                    styleObject = {
                      backgroundImage: `url(${url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }
                    return (
                    <div className="small-tweet-image" key ={url} style={styleObject} alt={`tweetImage${index}`} />
                    )
                  }
                })}
              </div>
            </>
          )
        }
      }))
    } else {
      setDisplayedImages(imageUrls?.map((url, index) => {
        let styleObject = {
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }
        // if (imageUrls.length === 4) styleObject = {...styleObject, aspectRatio: 1.78}
        return <div className="tweet-image" key ={url} style={styleObject} alt={`tweetImage${index}`} />
      }))
    }
  },[imageUrls.length])

  const [tags, setTags] = useState([
    { id: 'Sexy', text: 'Sexy' },
    { id: 'Dark', text: 'Dark' },
    { id: 'Businesslike', text: 'Businesslike' },
    { id: 'Promotional', text: 'Promotional' }
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
    dispatch(clearTweetErrors());
    dispatch(fetchUserTweets(author._id));
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
    if (window.selectedDate) {
        dispatch(composeTweet({
        body: generatedBody.slice(1, -1), // slice to get rid of extra quotation marks
        images,
        date: window.selectedDate,
        categories: tags.map(tag => tag.text)
      })); 
      setImages([]);                        
      setImageUrls([]); 
      setBody('');
      fileRef.current.value = null;
      history.push('/profile')
    } else {
      setScheduledDateError('Please schedule a date for this post before proceeding!')
    }
    
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

  const handleSchedule = (e) => {
    e.preventDefault();
    if (showSelect === false) {
      setShowSelect(true);
    } else {
      setShowSelect(false);
    }
    
  }

  return (
    <>
    <div id='new-tweet-modal' className={showSelect ? 'modal-show' : 'modal-hide'} >
    </div>
      <NavBar/>
      <SelectDateCalendar showSelect={showSelect}/>
      <div className='generateTweetContainer'>

          <div className='generateTweetContainerTop'>
            
            
            
         

                
          {showGeneratedTweet ? (
            <>
                <div className='generateMiddle'> 

                <div className='tweet-header-container'>
                  <div>
                    <p className='tweet-preview-header'>{author.username}     <i className="fa-solid fa-circle-check"></i></p>
                    <p className='tweet-preview-header-2'>@{author.twitterHandle}</p>
                  </div>
                  <div className='tweet-header-ellipsis'><i className="fa-solid fa-ellipsis"></i></div>
                </div>   

                {generatedBody ? <textarea
                  rows="9"
                  cols="20"
                  wrap='soft'
                  className='generated-tweet-body'
                  type="textarea"
                  value={generatedBody}
                  onChange={(e) => {setGeneratedBody(e.target.value)}}
                  required
                /> : 
                <div className='ai-loading-div'>
                  < LoadingPage type={'bubbles'} color={'#91C8E4'} height={'15vh'} width={'19vw'}/> 
                </div>
                }
                
                <div className="generated-tweet-images">
                  {(imageUrls.length !== 0) ?                  
                  displayedImages : // <-- MODIFY THIS LINE
                  undefined}
                </div>

              <div className='twitter-icons'>
                <p><i className="fa-solid fa-comment"> 0</i></p>
                <p><i className="fa-solid fa-retweet"> 0</i></p>
                <p><i className="fa-solid fa-heart"> 0</i></p>
                <p><i className="fa-solid fa-chart-simple"> 0</i></p>
                <p><i className="fa-solid fa-arrow-up-from-bracket"></i></p>
              </div>
              </div>
              <div className='bottomButtonsRight'>
                <button className='scheduleTweetButton' onClick={handleSchedule}>Schedule Tweet</button> 
                <button className='scheduleTweetButton' onClick={handleGenerate} >Confirm</button>
              </div>
              {scheduleDateError && <>
                <p className='generate-error'>{scheduleDateError}</p>
              </>}
              </>
          ) : ""}

            

          
          
          
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

                <div className='display-box-image'>
                  <label>
                    Images to Upload
                    <input
                      type="file"
                      ref={fileRef}
                      accept=".jpg, .jpeg, .png"
                      multiple
                      onChange={updateFiles} />
                  </label>
                </div>

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

            <br/>

          </div>
            <button className="generateButton" onClick={() => {
              if (userInstructions === '' ) {
                setGenerateError('Please enter your instructions for the AI above!')
              }
              else if (!showGeneratedTweet && userInstructions.length > 0) {
                setShowGeneratedTweet(true);
                setTriggerGeneration(true);
                setGenerateError(false);
              }
              }}>{showGeneratedTweet ? "Regenerate" : "Generate"}</button>
              {generateError && 
              <>
                <p className='generate-error'>{generateError}</p>
              </>}
          
          <div className='generateRight'>      
            
          </div>
          </div>


         </div>



      </div>
    </>
  )
}

export default TweetGenerate;