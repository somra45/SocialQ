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
    photoUrl: {
        type: String
    },
    videoUrl: {
        type: String
    }
    }, {
    timestamps: true
    });
    
    module.exports = mongoose.model('Tweet', tweetSchema);