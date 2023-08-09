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
        type: String,
        validate: {
            validator: function(value) {
              // If photoUrl1 is present, photoDesc1 is required
              if (this.photoUrl1 && !value) {
                return false;
              }
              return true;
            },
            message: 'Description is required when photo is present'
        }
    },
    photoUrl2: {
        type: String
    },
    photoDesc2: {
        type: String,
        validate: {
            validator: function(value) {
              // If photoUrl2 is present, photoDesc2 is required
              if (this.photoUrl2 && !value) {
                return false;
              }
              return true;
            },
            message: 'Description is required when photo is present'
        },
    },
    photoUrl3: {
        type: String
    },
    photoDesc3: {
        type: String,
        validate: {
            validator: function(value) {
              // If photoUrl3 is present, photoDesc3 is required
              if (this.photoUrl3 && !value) {
                return false;
              }
              return true;
            },
            message: 'Description is required when photo is present'
        },
    },
    photoUrl4: {
        type: String
    },
    photoDesc4: {
        type: String,
        validate: {
            validator: function(value) {
              // If photoUrl4 is present, photoDesc4 is required
              if (this.photoUrl4 && !value) {
                return false;
              }
              return true;
            },
            message: 'Description is required when photo is present'
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