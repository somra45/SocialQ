const mongoose = require('mongoose');
const Subscription = mongoose.model('Subscription');
const Tweet = mongoose.model('Tweet');
const User = mongoose.model('User');
const Category = mongoose.model('Category')
const PostCategory = mongoose.model('PostCategory');

const responseArrayToObject = (tweetArray) => {
  const tweetObjects = {}
  tweetArray.forEach(tweet => {
    const tweetId = tweet._id.toString()
    tweetObjects[tweetId] = tweet
  })
  return tweetObjects
}

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
    getSubscribedTweets,
    responseArrayToObject,
    addCategoriesAndImagesToTweet
}