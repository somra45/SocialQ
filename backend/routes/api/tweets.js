
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
  
  if (tweet.imageUrl1) mediaUrls.images[1] = {url: tweet.imageUrl1, desc: tweet.imageDesc1}
  if (tweet.imageUrl2) mediaUrls.images[2] = {url: tweet.imageUrl2, desc: tweet.imageDesc2}
  if (tweet.imageUrl3) mediaUrls.images[3] = {url: tweet.imageUrl3, desc: tweet.imageDesc3}
  if (tweet.imageUrl4) mediaUrls.images[4] = {url: tweet.imageUrl4, desc: tweet.imageDesc4}
 
  if (tweet.videoUrl1) mediaUrls.videos[1] = {url: tweet.videoUrl1, desc: tweet.videoDesc1}
  if (tweet.videoUrl1) mediaUrls.videos[2] = {url: tweet.videoUrl2, desc: tweet.videoDesc2}
  if (tweet.videoUrl1) mediaUrls.videos[3] = {url: tweet.videoUrl3, desc: tweet.videoDesc3}
  if (tweet.videoUrl1) mediaUrls.videos[4] = {url: tweet.videoUrl4, desc: tweet.videoDesc4}

  tweet._doc.mediaUrls = mediaUrls;

  return tweet
}

const tweetArrayToObject = (tweetArray) => {
  const tweetObjects = {}
  tweetArray.forEach(tweet => {
    const tweetId = tweet._id.toString()
    tweetObjects[tweetId] = tweet
  })
  return tweetObjects
}

router.get('/', async function(req, res, next) {
  // res.json({
  //   message: "GET /api/tweets"
  // });
  try {
    const tweets = await Tweet.find()
                              .populate("author", "_id username profileImageUrl twitterHandle instagramHandle")
                              .sort({ createdAt: -1 });

    const tweetsWithCategories = await Promise.all(tweets.map(async tweet => {
          tweet = await addCategoriesAndImagesToTweet(tweet)
          return tweet;
    }));

    const tweetObjects = tweetArrayToObject(tweetsWithCategories)
                          
    return res.json(tweetObjects);
  }
  catch(err) {
    return res.json([]);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    let tweets = await Tweet.find({ author: user._id })
                              .sort({ createdAt: -1 })
                              .populate("author", "_id username profileImageUrl twitterHandle instagramHandle");

    //need Promise.all for all promises to resolve before tweet._doc.categories is assigned, otherwise it assigns and moves on before waiting for the promise to resolve
    const tweetsWithCategories = await Promise.all(tweets.map(async tweet => {
      tweet = await addCategoriesAndImagesToTweet(tweet)
      return tweet;
    }));

    const tweetObjects = tweetArrayToObject(tweetsWithCategories)
                          
    return res.json(tweetObjects);
  }
  catch(err) {
    return res.json([]);
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

router.post('/', multipleMulterUpload("images"), requireUser, validateTweetInput, async (req, res, next) => {
  const imageUrls = await multipleFilesUpload({ files: req.files, public: true });
  try {
    const newTweet = new Tweet({
      body: req.body.body, /*make sure this matches what's coming in from front end*/
      author: req.user._id,
      imageUrls,
      imageDesc1: req.body.imageDescriptions[0],
      imageDesc2: req.body.imageDescriptions[1],
      imageDesc3: req.body.imageDescriptions[2],
      imageDesc4: req.body.imageDescriptions[3],
      date: req.body.date,
      photoUrl: req.body.photoUrl,
      videoUrl: req.body.videoUrl,
      date: new Date(),
      categories: req.body.tweetCategories || ['funny', 'cool', 'unique']
    });

    let tweet = await newTweet.save();
    
    //create new categories for anything not already in db
    if (newTweetCategories.length) newTweetCategories.forEach(async catEl => {
      const category = await Category.findOne({name: catEl.toLowerCase()})
      if (!category) {
        let cat = await new Category({name: catEl.toLowerCase()});
        cat.save();
        cat = await Category.find({name: catEl.toLowerCase()});
      }
    });

    //create new postCategory for each category, now that categories have been created
    let mappedCategoryIds = newTweetCategories.forEach(async catEl =>{
      const category = await Category.findOne({name: catEl.toLowerCase()})
      PostCategory.create({category: category._id, post: tweet._id});
    })

    tweet = await tweet
                      .populate("author", "_id username profileImageUrl twitterHandle instagramHandle");

    const updatedTweet = await addCategoriesAndImagesToTweet(tweet);
                        
    return res.json(updatedTweet);
  }
  catch(err) {
    next(err);
  }
});

router.put('/:id', requireUser, validateTweetInput, async (req, res, next) => {
  console.log(req)
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
    

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.json({ tweetId: tweetId, message: 'Post deleted successfully' });
  } catch (error) {
    dbLogger('error: ' + error)
    return res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;