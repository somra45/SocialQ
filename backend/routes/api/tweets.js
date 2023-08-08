
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
    // let tweetsWithCategories = {...tweets}
    // tweetsWithCategories.forEach(tweet =>{
      // dbLogger(tweet)
    // })

    //need Promise.all for all promises to resolve before tweet._doc.categories is assigned, otherwise it assigns and moves on before waiting for the promise to resolve
    const updatedTweets = await Promise.all(tweets.map(async tweet => {
      let postCategoriesArray = await PostCategory.find({post: tweet._id}).exec();
      let mappedCategoriesArray = postCategoriesArray['0'] ? [(await Category.findOne({_id: postCategoriesArray['0'].category}))._doc.name] : []
      tweet._doc.categories = mappedCategoriesArray
      dbLogger(tweet);
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
    return res.json(tweet);
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
    let newTweetCategories = ['funny'];
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
    
    //create new categories for anything not already in db
    if (newTweetCategories.length) newTweetCategories.forEach(async catEl => {
      const category = await Category.find({name: catEl.toLowerCase()})
      if (!category) {
        dbLogger('moving into creation')
        let cat = await new Category({name: catEl.toLowerCase()});
        dbLogger(`new cat: ${cat}`)
        cat.save();
        cat = await Category.find({name: catEl.toLowerCase()});
        dbLogger(`created: ${cat}`);
      }
    });

    //create new postCategory for each category, now that categories have been created
    let mappedCategoryIds = newTweetCategories.forEach(async catEl =>{
      const category = await Category.findOne({name: catEl.toLowerCase()})
      dbLogger(`category, ${category}, categoryId: ${category._id}, post: ${tweet._id}`)
      PostCategory.create({category: category._id, post: tweet._id});
      // dbLogger(PostCategory.find())
    })
    
    //get an array of categories for that tweet, now that postCategories have been created
    // let tweetCategories = await PostCategory.find({postId: tweet.id});
    // let mappedTweetCategories = tweetCategories.map(async el => {
    //   Category.find({name: el.name});
    // });

    tweet = await tweet
                      .populate('author', '_id username');
                      // .populate({
                      //   path: 'category',
                      //   match: { username: { $regex: keyword, $options: 'i' } }, // Filtering the author by username
                      // })
    // tweet['categories'] = mappedTweetCategories

    return res.json(tweet);
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