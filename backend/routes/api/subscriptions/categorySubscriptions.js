
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Category = mongoose.model('Category');
const Subscription = mongoose.model('Subscription')
const {getSubscribedCategories, getSubscribedUsers, responseArrayToObject} = require('../modules')
const { requireUser } = require('../../../config/passport');

router.post('/:categoryName', requireUser, async (req, res, next) => {
  const currentUser = req.user;

  let subscribedCategory;
  if (mongoose.Types.ObjectId.isValid(req.params.categoryName)) {
    subscribedCategory = await Category.findOne({ _id: req.params.categoryName });
  } else {
    subscribedCategory = await Category.findOne({ name: req.params.categoryName });
  }

  if (!subscribedCategory) {
    return res.status(404).json({ message: 'Category not found' });
  }
  // try {
    const newSubscription = await Subscription.create({
      subscriber: currentUser._id,
      subscribableType: 'category',
      subscribable: subscribedCategory._id
    })

    if (!newSubscription) {
      return res.status(422).json({ error: 'Could not subscribe to category' });
    }

    const subscribedUsers = await getSubscribedUsers(currentUser)
    const subscribedCategories = await getSubscribedCategories(currentUser)

    const updatedUserInfo = {
      _id: currentUser._id,
      username: currentUser.username,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      twitterHandle: currentUser.twitterHandle,
      instagramHandle: currentUser.instagramHandle,
      subscriptions: {
        users: responseArrayToObject(subscribedUsers),
        categories: responseArrayToObject(subscribedCategories)}
    }

    return res.json({ updatedUser: updatedUserInfo, message: 'Successfully subscribed to category' });
  // }
  
  // catch(err) {
  //   return res.json([]);
  // }
})

router.delete('/:categoryName', requireUser, async (req, res, next) => {
  const currentUser = req.user;

  let subscribedCategory;
  if (mongoose.Types.ObjectId.isValid(req.params.categoryName)) {
    subscribedCategory = await Category.findOne({ _id: req.params.categoryName });
  } else {
    subscribedCategory = await Category.findOne({ name: req.params.categoryName });
  }

  if (!subscribedCategory) {
    return res.status(404).json({ message: 'Category not found' });
  }
  
  // try {
    const currentSubscription = await Subscription.findOne({
      subscriber: currentUser._id,
      subscribableType: 'category',
      subscribable: subscribedCategory._id
    })

    if (!currentSubscription) {
      console.log('405: subscription not found')
      return res.status(405).json({ message: 'Subscription not found' });
    }

    await currentSubscription.deleteOne()

    const subscribedUsers = await getSubscribedUsers(currentUser)
    const subscribedCategories = await getSubscribedCategories(currentUser)

    const updatedUserInfo = {
      _id: currentUser._id,
      username: currentUser.username,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      twitterHandle: currentUser.twitterHandle,
      instagramHandle: currentUser.instagramHandle,
      subscriptions: {
        users: responseArrayToObject(subscribedUsers),
        categories: responseArrayToObject(subscribedCategories)}
    }


    return res.json({ updatedUser: updatedUserInfo, message: 'Successfully unsubscribed to category' });
    
  // } catch(err) {
  //   return res.status(422).json({ error: 'Could not unsubscribe' });
  // }
})

module.exports = router;