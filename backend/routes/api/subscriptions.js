
const express = require('express');
const router = express.Router();

// router.get('/user/:userId', async (req, res, next) => {
//     let user;
//     try {
//       user = await User.findById(req.params.userId);
//     } catch(err) {
//       const error = new Error('User not found');
//       error.statusCode = 404;
//       error.errors = { message: "No user found with that id" };
//       return next(error);
//     }
//     try {
//       const tweets = await Tweet.find({ author: user._id })
//                                 .sort({ createdAt: -1 })
//                                 .populate("author", "_id username");
//       // const subscriptions = await Subscription.find({subscriber: user._id})
//       //                                         .sort({ createdAt: -1 })
//       //                                         .populate("subscribtions", "_id username");
  
//       return res.json(tweets);
//     }
//     catch(err) {
//       return res.json([]);
//     }
//   })

module.exports = router;