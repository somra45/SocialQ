const mongoose = require('mongoose');
const Subscription = mongoose.model('Subscription');
const Tweet = mongoose.model('Tweet');
const User = mongoose.model('User');
const Category = mongoose.model('Category')
const PostCategory = mongoose.model('PostCategory');

const getSubscribedUsers = async (user) => {
    const subscriptions = await Subscription.find({
      subscribableType: 'user',
      subscriber: user._id,
      })
      const userPromises = subscriptions.map(async sub => await User.findById(sub.subscribable))
      const usersArray = await Promise.all(userPromises)
      return usersArray
};

const getSubscribedCategories = async (user) => {
    const subscriptions = await Subscription.find({
      subscribableType: 'category',
      subscriber: user._id,
      })
      const categoryPromises = subscriptions.map(async sub => await Category.findById(sub.subscribable))
      const categoriesArray = await Promise.all(categoryPromises)
      return categoriesArray
};

const getSubscribedTweets = async (user) => {
  const userOwnTweets = await Tweet.find({
                                  author: user.id,
                                  date: { $lt: new Date() }
                                })
          .populate("author", "_id username profileImageUrl twitterHandle instagramHandle")
  
  const subscribedUsers = await getSubscribedUsers(user)
  const subscribedUserTweets = await Tweet.find({author: {$in: subscribedUsers}})
          .populate("author", "_id username profileImageUrl twitterHandle instagramHandle")
          
  const subscribedCategories = await getSubscribedCategories(user);
  const subscribedPostCategories = await PostCategory.find({category: {$in: subscribedCategories}})
  const subscribedTweetIds = subscribedPostCategories.map(postCat => postCat.post)
  const subscribedCategoryTweets = await Tweet.find({
    author: {$nin: user._id},
    _id: {$in: subscribedTweetIds}
  })
          .populate("author", "_id username profileImageUrl twitterHandle instagramHandle")
  return userOwnTweets.concat(subscribedUserTweets).concat(subscribedCategoryTweets)
}

module.exports = {
    getSubscribedUsers,
    getSubscribedCategories,
    getSubscribedTweets
}