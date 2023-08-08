
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');
const Category = mongoose.model('Category');
const PostCategory = mongoose.model('PostCategory');
const { requireUser } = require('../../config/passport');
const validateTweetInput = require('../../validations/tweets');
var debug = require('debug');
const serverLogger = debug('backend:server');
const dbLogger = debug('backend:mongodb');


const addCategoriesToTweet = async (tweet) => {
  let postCategoriesArray = await PostCategory.find({post: tweet._id}).exec();
  dbLogger(postCategoriesArray)
      const mappedCategoriesArray = []


      while (postCategoriesArray.length) {
        let shiftedCategory = postCategoriesArray.shift()
        //find the category whose ID is the postCategory's categoryId, then push that into the mappedCategoriesArray
        const category = await Category.findOne({_id: shiftedCategory._doc.category}).exec()
        mappedCategoriesArray.push(category._doc.name)
      }

      //set the mappedCategoriesArray as the tweet's categories
      tweet._doc.categories = mappedCategoriesArray
      return tweet
}

router.get('/', async function(req, res, next) {
  // res.json({
  //   message: "GET /api/tweets"
  // });
  try {
    const tweets = await Tweet.find()
                              .populate("author", "_id username")
                              .sort({ createdAt: -1 });
    return res.json(tweets);
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
                              .populate("author", "_id username");

    //need Promise.all for all promises to resolve before tweet._doc.categories is assigned, otherwise it assigns and moves on before waiting for the promise to resolve
    const updatedTweets = await Promise.all(tweets.map(async tweet => {
      tweet = await addCategoriesToTweet(tweet)
      return tweet;
    }));

    return res.json(updatedTweets);
  }
  catch(err) {
    return res.json([]);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id)
                             .populate("author", "_id username");
    const updatedTweet = await addCategoriesToTweet(tweet);
                        
    return res.json(updatedTweet);
  }
  catch(err) {
    const error = new Error('Tweet not found');
    error.statusCode = 404;
    error.errors = { message: "No tweet found with that id" };
    return next(error);
  }
})

router.post('/', requireUser, validateTweetInput, async (req, res, next) => {
  try {
    let newTweetCategories = ['funny', 'cool', 'unique'];
    const newTweet = new Tweet({
      body: req.body.body, /*make sure this matches what's coming in from front end*/
      author: req.user._id,
      date: req.body.date,
      photoUrl: req.body.photoUrl,
      videoUrl: req.body.videoUrl,
      date: new Date(),
      categories: newTweetCategories
    });

    let tweet = await newTweet.save();
    dbLogger(tweet)
    
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
                      .populate('author', '_id username');

    const updatedTweet = await addCategoriesToTweet(tweet);
                        
    return res.json(updatedTweet);
  }
  catch(err) {
    debugger
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
    const postId = req.params.id;

    // Find the post by its ID and delete it
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;