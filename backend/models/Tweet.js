const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    },
    body: {
        type: String,
        required: true
    },







    photoUrl1: {
        type: String
    },
    photoDesc1: {
        type: String
    },
    photoUrl2: {
        type: String
    },
    photoDesc2: {
        type: String
    },
    photoUrl3: {
        type: String
    },
    photoDesc3: {
        type: String
    },
    photoUrl4: {
        type: String
    },
    photoDesc4: {
        type: String
    },





    videoUrl1: {
        type: String
    },
    videoDesc1: {
        type: String
    },
    videoUrl2: {
        type: String
    },
    videoDesc2: {
        type: String
    },
    videoUrl3: {
        type: String
    },
    videoDesc3: {
        type: String
    },
    videoUrl4: {
        type: String
    },
    videoDesc4: {
        type: String
    },




    replyCount: {
        type: Number
    },
    retweetCount: {
        type: Number
    },
    quoteTweetCount: {
        type: Number
    },
    viewCount: {
        type: Number
    },
    likeCount: {
        type: Number
    },
    bookmarkCount: {
        type: Number
    },
    createdOnSocialQ: {
        type: Boolean,
        required: true,
        default: false
    }


    }, {
    timestamps: true
    });
    
    module.exports = mongoose.model('Tweet', tweetSchema);