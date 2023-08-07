const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    twitterHandle: {
      type: String,
      // required: true,
      unique: true
    },
    instagramHandle: {
      type: String,
      // required: true,
      unique: true
    },

  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema);