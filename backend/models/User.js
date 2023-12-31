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
    profileImageUrl: {
      type: String
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
      unique: true,
      sparse: true
    },
    instagramHandle: {
      type: String,
      unique: true,
      sparse: true
    },

  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema);