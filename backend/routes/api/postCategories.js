const express = require('express');
const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const PostCategory = mongoose.model('PostCategory');
const Tweet = mongoose.model('Tweet');
const User = mongoose.model('User');
const {responseArrayToObject, addCategoriesAndImagesToTweet} = require('./modules');
const router = express.Router();

router.get('/:categoryName', async (req,res,next) => {
    try {
        let category;

        if (mongoose.Types.ObjectId.isValid(req.params.categoryName)) {
            category = await Category.findOne({ _id: req.params.categoryName });
        } else {
            category = await Category.findOne({ name: req.params.categoryName.toLowerCase() });
        }
        if (!category) return res.status(405).json({message: 'No valid category found'});

        try {
            const postCategories = await PostCategory.find({category: category._id})
            const categoryTweetsArray = await Promise.all(postCategories.map(async cat => {
                const tweet = await Tweet.findOne({_id: cat.post})
                                .populate("author", "_id username profileImageUrl twitterHandle instagramHandle");
                if (tweet) {
                    const updatedTweet = await addCategoriesAndImagesToTweet(tweet);
                    return updatedTweet
                }
                return null
            }));
            const filteredTweets = categoryTweetsArray.filter(Boolean)
            const categoryTweets = responseArrayToObject(filteredTweets)
            return res.json(categoryTweets)
        } catch(err) {
            return res.status(422).json({message: 'Error: could not find tweets'})
        }
    } catch(err) {
        const error = new Error('Category not found');
        error.statusCode = 404;
        error.errors = {message: 'No categry found by that name'}
        return next(error)
    }
})

module.exports = router;
