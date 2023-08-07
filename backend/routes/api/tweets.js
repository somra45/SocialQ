
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');
const { requireUser } = require('../../config/passport');
const validateTweetInput = require('../../validations/tweets');

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
    const tweets = await Tweet.find({ author: user._id })
                              .sort({ createdAt: -1 })
                              .populate("author", "_id username");
    // const subscriptions = await Subscription.find({subscriber: user._id})
    //                                         .sort({ createdAt: -1 })
    //                                         .populate("subscribtions", "_id username");

    return res.json(tweets);
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
    const newTweet = new Tweet({
      body: req.body.body, /*make sure this matches what's coming in from front end*/
      author: req.user._id,
      date: req.body.date,
      photoUrl: req.body.photoUrl,
      videoUrl: req.body.videoUrl,
      categories: req.body.categories
    });

    let tweet = await newTweet.save();
    tweet = await tweet.populate('author', '_id username');
    return res.json(tweet);
  }
  catch(err) {
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