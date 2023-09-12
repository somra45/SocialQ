
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');
const Category = mongoose.model('Category');
const PostCategory = mongoose.model('PostCategory');
const { requireUser } = require('../../config/passport');
const validateTweetInput = require('../../validations/tweets');
const { multipleFilesUpload, multipleMulterUpload } = require("../../awsS3");
const {getSubscribedUsers, getSubscribedCategories, getSubscribedTweets, responseArrayToObject} = require('./modules.js')
const axios = require('axios');


var debug = require('debug');
const serverLogger = debug('backend:server');
const dbLogger = debug('backend:mongodb');


const addCategoriesAndImagesToTweet = async (tweet) => {
  let postCategoriesArray = await PostCategory.find({post: tweet._id}).exec();
  const mappedCategoriesArray = []


  while (postCategoriesArray.length) {
    let shiftedCategory = postCategoriesArray.shift()
    //find the category whose ID is the postCategory's categoryId, then push that into the mappedCategoriesArray
    const category = await Category.findOne({_id: shiftedCategory._doc.category}).exec()
    mappedCategoriesArray.push(category._doc.name)
  }

  //set the mappedCategoriesArray as the tweet's categories
  tweet._doc.categories = mappedCategoriesArray

  const mediaUrls = {images: {}, videos: {}}
  if (tweet.imageUrl1) mediaUrls.images[1] = {url: tweet.imageUrl1}
  if (tweet.imageUrl2) mediaUrls.images[2] = {url: tweet.imageUrl2}
  if (tweet.imageUrl3) mediaUrls.images[3] = {url: tweet.imageUrl3}
  if (tweet.imageUrl4) mediaUrls.images[4] = {url: tweet.imageUrl4}
 
  if (tweet.videoUrl1) mediaUrls.videos[1] = {url: tweet.videoUrl1}
  if (tweet.videoUrl1) mediaUrls.videos[2] = {url: tweet.videoUrl2}
  if (tweet.videoUrl1) mediaUrls.videos[3] = {url: tweet.videoUrl3}
  if (tweet.videoUrl1) mediaUrls.videos[4] = {url: tweet.videoUrl4}

  // if (tweet.imageUrl1) mediaUrls.images[1] = {url: tweet.imageUrl1, desc: tweet.imageDesc1}
  // if (tweet.imageUrl2) mediaUrls.images[2] = {url: tweet.imageUrl2, desc: tweet.imageDesc2}
  // if (tweet.imageUrl3) mediaUrls.images[3] = {url: tweet.imageUrl3, desc: tweet.imageDesc3}
  // if (tweet.imageUrl4) mediaUrls.images[4] = {url: tweet.imageUrl4, desc: tweet.imageDesc4}
 
  // if (tweet.videoUrl1) mediaUrls.videos[1] = {url: tweet.videoUrl1, desc: tweet.videoDesc1}
  // if (tweet.videoUrl1) mediaUrls.videos[2] = {url: tweet.videoUrl2, desc: tweet.videoDesc2}
  // if (tweet.videoUrl1) mediaUrls.videos[3] = {url: tweet.videoUrl3, desc: tweet.videoDesc3}
  // if (tweet.videoUrl1) mediaUrls.videos[4] = {url: tweet.videoUrl4, desc: tweet.videoDesc4}

  tweet._doc.mediaUrls = mediaUrls;
  // console.log(tweet)

  return tweet
}



router.get('/', requireUser, async function(req, res, next) {
  // res.json({
  //   message: "GET /api/tweets"
  // });
  try {
    const currentUser = req.user
    const subscribedTweets = await getSubscribedTweets(currentUser)
    const tweetsWithCategories = await Promise.all(subscribedTweets.map(async tweet => {
          tweet = await addCategoriesAndImagesToTweet(tweet)
          return tweet;
    }));

    const userOwnTweets = tweetsWithCategories.filter(tweet => tweet.author._id.toString() === currentUser._id.toString())

    const userOwnTweetObjects = responseArrayToObject(userOwnTweets)
    const subscribedTweetObjects = responseArrayToObject(tweetsWithCategories)

    const tweets = {subscribed: subscribedTweetObjects, user: userOwnTweetObjects}

    return res.json(tweets);
  }
  catch(err) {
    return res.json([]);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  try {
    let user;
    
    // Check if req.params.userId is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
      user = await User.findOne({ _id: req.params.userId });
    } else {
      user = await User.findOne({ username: req.params.userId });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    try {
      const userTweets = await Tweet.find({ author: user._id })
                                .sort({ createdAt: -1 })
                                .populate("author", "_id username profileImageUrl twitterHandle instagramHandle");
  
      //need Promise.all for all promises to resolve before tweet._doc.categories is assigned, otherwise it assigns and moves on before waiting for the promise to resolve
      const userTweetsWithCategories = await Promise.all(userTweets.map(async tweet => {
        tweet = await addCategoriesAndImagesToTweet(tweet)
        return tweet;
      }));
  
      const userTweetObjects = responseArrayToObject(userTweetsWithCategories)

      const subscribedTweets = await getSubscribedTweets(user)
      
      const subscribedTweetsWithCategories = await Promise.all(subscribedTweets.map(async tweet => {
            tweet = await addCategoriesAndImagesToTweet(tweet)
            return tweet;
      }));

      const subscribedTweetObjects = responseArrayToObject(subscribedTweetsWithCategories)
                            
      const tweets = {subscribed: subscribedTweetObjects, user: userTweetObjects}

      // const userSubscriptions = await getSubscribedUsers(user)
      // const categorySubscriptions = await getSubscribedCategories(user)
      // const currentPageSubscriptions = {users: responseArrayToObject(userSubscriptions), categories: responseArrayToObject(categorySubscriptions)}
      
      const response = {tweets}
      return res.json(response);
    }
    catch(err) {
      return res.json([]);
    }

  } catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
})

// router.get('/:id', async (req, res, next) => {
//   try {
//     const tweet = await Tweet.findById(req.params.id)
//                              .populate("author", "_id username");
//     const tweetWithCategories = await addCategoriesToTweet(tweet);
                        
//     return res.json(tweetWithCategories);
//   }
//   catch(err) {
//     const error = new Error('Tweet not found');
//     error.statusCode = 404;
//     error.errors = { message: "No tweet found with that id" };
//     return next(error);
//   }
// })

router.post('/', multipleMulterUpload("images"), requireUser, async (req, res, next) => {
  const imageUrls = await multipleFilesUpload({ files: req.files, public: true });
  try {
    const newTweet = new Tweet({
      body: req.body.body, /*make sure this matches what's coming in from front end*/
      author: req.user._id,
      imageUrls,
      // imageDesc1: req.body.imageDescriptions[0],
      // imageDesc2: req.body.imageDescriptions[1],
      // imageDesc3: req.body.imageDescriptions[2],
      // imageDesc4: req.body.imageDescriptions[3],
      date: req.body.date,
      photoUrl: req.body.photoUrl,
      videoUrl: req.body.videoUrl,
      createdOnSocialQ: true
    });

    let tweet = await newTweet.save();
    const newTweetCategories = req.body.newTweetCategories.split(',')
  
    //create new categories for anything not already in db
    if (newTweetCategories.length) newTweetCategories.forEach(async catEl => {
      let category = await Category.findOne({name: catEl.toLowerCase()})
      if (!category) {
        let cat = await new Category({name: catEl.toLowerCase()});
        cat.save();
        cat = await Category.find({name: catEl.toLowerCase()});
      }
      
      category = await Category.findOne({name: catEl.toLowerCase()})
      PostCategory.create({category: category._id, post: tweet._id});
      
    });

    //create new postCategory for each category, now that categories have been created

    tweet = await tweet
                      .populate("author", "_id username profileImageUrl twitterHandle instagramHandle");

    const updatedTweet = await addCategoriesAndImagesToTweet(tweet);
    console.log(updatedTweet)
                        
    return res.json(updatedTweet);
  }
  catch(err) {
    console.log(err)
    next(err);
  }
});



router.put('/:id', requireUser, validateTweetInput, async (req, res, next) => {
  try {
    const tweetId = req.params.id;
    const updates = req.body;
                             
    const updatedTweet = await Tweet.findByIdAndUpdate(tweetId, updates, {new: true})

    if (!updatedTweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    return res.json(updatedTweet);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
});

router.delete('/:id', async (req, res) => {

  //need to delete associated post categories when a tweet is deleted
  try {
    const tweetId = req.params.id;
    dbLogger('id:' + tweetId)

    // Find the post by its ID and delete it, and delete any associated postCategories
    PostCategory.deleteMany({post: tweetId})
    const deletedPost = await Tweet.findByIdAndDelete(tweetId);
    console.log(`deleted: ${deletedPost}`)

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.json({ tweetId: tweetId, message: 'Post deleted successfully' });
  } catch (error) {
    dbLogger('error: ' + error)
    return res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = {
  router,
  addCategoriesAndImagesToTweet
}