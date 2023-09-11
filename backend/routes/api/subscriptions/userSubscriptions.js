
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');
const Category = mongoose.model('Category');
const PostCategory = mongoose.model('PostCategory');
const { requireUser } = require('../../../config/passport');

router.post('/:userId', requireUser, async (req, res, next) => {
    const currentUser = req.user;

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

router.delete('/:userId', requireUser, async (req, res, next) => {
  const currentUser = req.user;
  
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

module.exports = router;