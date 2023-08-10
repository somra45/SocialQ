const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    body: {
        type: String,
        required: true
    },




    imageUrl1: {
        type: String
    },
    imageDesc1: {
        type: String,
        validate: {
            validator: function(value) {
              // If imageUrl1 is present, imageDesc1 is required
              if (this.imageUrl1 && !value) {
                return false;
              }
              return true;
            },
            message: 'Description is required when image is present'
        }
    },
    imageUrl2: {
        type: String
    },
    imageDesc2: {
        type: String,
        validate: {
            validator: function(value) {
              // If imageUrl2 is present, imageDesc2 is required
              if (this.imageUrl2 && !value) {
                return false;
              }
              return true;
            },
            message: 'Description is required when image is present'
        },
    },
    imageUrl3: {
        type: String
    },
    imageDesc3: {
        type: String,
        validate: {
            validator: function(value) {
              // If imageUrl3 is present, imageDesc3 is required
              if (this.imageUrl3 && !value) {
                return false;
              }
              return true;
            },
            message: 'Description is required when image is present'
        },
    },
    imageUrl4: {
        type: String
    },
    imageDesc4: {
        type: String,
        validate: {
            validator: function(value) {
              // If imageUrl4 is present, imageDesc4 is required
              if (this.imageUrl4 && !value) {
                return false;
              }
              return true;
            },
            message: 'Description is required when image is present'
        },
    },





    videoUrl1: {
        type: String
    },
    videoDesc1: {
        type: String,
        validate: {
            validator: function(value) {
              // If videoUrl1 is present, videoUrl1 is required
              if (this.videoUrl1 && !value) {
                return false;
              }
              return true;
            },
            message: 'Description is required when video is present'
        },
    },
    videoUrl2: {
        type: String,
        validate: {
            validator: function(value) {
              // If videoUrl2 is present, videoUrl2 is required
              if (this.videoUrl2 && !value) {
                return false;
              }
              return true;
            },
            message: 'Description is required when video is present'
        },
    },
    videoDesc2: {
        type: String
    },
    videoUrl3: {
        type: String
    },
    videoDesc3: {
        type: String,
        validate: {
            validator: function(value) {
              // If videoUrl3 is present, videoUrl3 is required
              if (this.videoUrl3 && !value) {
                return false;
              }
              return true;
            },
            message: 'Description is required when video is present'
        },
    },
    videoUrl4: {
        type: String
    },
    videoDesc4: {
        type: String,
        validate: {
            validator: function(value) {
              // If videoUrl4 is present, videoUrl4 is required
              if (this.videoUrl4 && !value) {
                return false;
              }
              return true;
            },
            message: 'Description is required when video is present'
        },
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