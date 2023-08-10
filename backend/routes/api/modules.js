const mongoose = require('mongoose');
const Subscription = mongoose.model('Subscription');
const Tweet = mongoose.model('Tweet');
const PostCategory = mongoose.model('PostCategory');

const getSubscribedUsers = async (user) => {
    const subscriptions = await Subscription.find({
      subscribableType: 'user',
      subscriber: user._id,
      })
      const array = subscriptions.map(sub => sub.subscribable)
      return array
};

const getSubscribedCategories = async (user) => {
    const subscriptions = await Subscription.find({
      subscribableType: 'category',
      subscriber: user._id,
      })
      const array = subscriptions.map(sub => sub.subscribable)
      return array
};

const getSubscribedTweets = async (user) => {
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
  // console.log([subscribedUserTweets, subscribedCategoryTweets])
  return subscribedUserTweets.concat(subscribedCategoryTweets)
}

module.exports = {
    getSubscribedUsers,
    getSubscribedCategories,
    getSubscribedTweets
}