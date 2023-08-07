const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validateTweetInput is a combination Express middleware that uses the check
// middleware to validate the keys in the body of the request to create/edit
// a tweet
const validateTweetInput = [
  check('body')
    .exists({ checkFalsy: true })
    .isLength({ /*min: 5,*/ max: 280 })
    .withMessage('Tweet must be less than 280 characters'),
  handleValidationErrors
];

module.exports = validateTweetInput;