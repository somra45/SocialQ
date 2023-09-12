var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const { loginUser, restoreUser } = require('../../config/passport');
const {getSubscribedUsers, getSubscribedCategories, responseArrayToObject} = require('./modules');
const { isProduction } = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");

router.get('/current', restoreUser, async (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);

  const subscribedUsers = await getSubscribedUsers(req.user)
  const subscribedCategories = await getSubscribedCategories(req.user)
  
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    profileImageUrl: req.user.profileImageUrl,
    twitterHandle: req.user.twitterHandle,
    instagramHandle: req.user.instagramHandle,
    subscriptions: {users: responseArrayToObject(subscribedUsers), categories: responseArrayToObject(subscribedCategories)},
  });
});

router.post('/register', singleMulterUpload("image"), validateRegisterInput,async (req, res, next) => {

  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    const err = new Error("Validation Error");
    err.statusCode = 422;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }
  const profileImageUrl = req.file ?
      await singleFileUpload({ file: req.file, public: true }) :
      'https://socialq--seeds.s3.us-east-2.amazonaws.com/frank.png';

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName ? req.body.firstName : 'first',
    lastName: req.body.lastName ? req.body.lastName : 'last',
    profileImageUrl,
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});

router.post('/login', singleMulterUpload(''), async (req, res, next) => {
  passport.authenticate('local', validateLoginInput, async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 422;
      err.email= true;
      err.password= true;
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

module.exports = router;
