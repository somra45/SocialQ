
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Subscription = mongoose.model('Subscription');
const { requireUser } = require('../../../config/passport');
const {getSubscribedCategories, getSubscribedUsers, responseArrayToObject} = require('../modules')

router.post('/:username', requireUser, async (req, res, next) => {
  const currentUser = req.user;

  let subscribedUser;
  if (mongoose.Types.ObjectId.isValid(req.params.username)) {
    subscribedUser = await User.findOne({ _id: req.params.username });
  } else {
    subscribedUser = await User.findOne({ username: req.params.username });
  }

  if (!subscribedUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  // try {
    const newSubscription = await Subscription.create({
      subscriber: currentUser._id,
      subscribableType: 'user',
      subscribable: subscribedUser._id
    })

    if (!newSubscription) {
      return res.status(422).json({ error: 'Could not subscribe to user' });
    }

    const subscribedUsers = await getSubscribedUsers(currentUser)
    console.log(`users: ${subscribedUsers}`)
    const subscribedCategories = await getSubscribedCategories(currentUser)
    console.log(`categories: ${subscribedCategories}`)

    console.log(`currentUser: ${currentUser}`)
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
    console.log(`updated: ${updatedUserInfo}`)

    return res.json({ updatedUser: updatedUserInfo, message: 'Successfully subscribed to user' });
  // }
  
  // catch(err) {
  //   return res.json([]);
  // }
})

router.delete('/:username', requireUser, async (req, res, next) => {
  const currentUser = req.user;

  let subscribedUser;
  if (mongoose.Types.ObjectId.isValid(req.params.username)) {
    subscribedUser = await User.findOne({ _id: req.params.username });
  } else {
    subscribedUser = await User.findOne({ username: req.params.username });
  }

  if (!subscribedUser) {
    console.log(`404: current user not found`)
    return res.status(404).json({ message: 'User not found' });
  }
  
  // try {
    const currentSubscription = await Subscription.findOne({
      subscriber: currentUser._id,
      subscribableType: 'user',
      subscribable: subscribedUser._id
    })

    if (!currentSubscription) {
      console.log('405: subscription not found')
      return res.status(405).json({ message: 'Subscription not found' });
    }

    await currentSubscription.deleteOne()

    const subscribedUsers = await getSubscribedUsers(currentUser)
    console.log(`users: ${subscribedUsers}`)
    const subscribedCategories = await getSubscribedCategories(currentUser)
    console.log(`categories: ${subscribedCategories}`)

    console.log(`currentUser: ${currentUser}`)
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
    console.log(`updatedUser: ${updatedUserInfo}`)


    return res.json({ updatedUser: updatedUserInfo, message: 'Successfully unsubscribed to user' });
    
  // } catch(err) {
  //   return res.status(422).json({ error: 'Could not unsubscribe' });
  // }
})

module.exports = router;