const User = require('../models/User');
const Tweet = require('../models/Tweet');

const createCookieMonsterTweets = async () => {
  const cookieMonster = await User.findOne({ firstName: 'Cookie', lastName: 'Monster' });

  const cookieMonsterTweets = [
    new Tweet ({
        body: `Have you om nom nom nomed today?`,
        author: cookieMonster._id,
        date: new Date('January 17, 2023, 1:22 PM EDT'),
        replyCount: 328,
        retweetCount: 2239,
        quoteTweetCount: 69,
        likeCount: 12500,
        viewCount: 952000,
        bookmarkCount: 90,
        createdOnSocialQ: false
      }),
      new Tweet ({
        body: `Me got crumbs on me thumbs!`,
        author: cookieMonster._id,
        date: new Date('August 4, 2023, 9:29 AM EDT'),
        replyCount: 48,
        retweetCount: 214,
        quoteTweetCount: 14,
        likeCount: 2504,
        viewCount: 128000,
        bookmarkCount: 8,
        createdOnSocialQ: false
      }),
      new Tweet ({
        body: `It's so hot outside dat you can bake cookies on da sidewalk.
        Wait, me think me is a genius!`,
        author: cookieMonster._id,
        date: new Date('July 8, 2023, 10:34 AM EDT'),
        replyCount: 71,
        retweetCount: 840,
        quoteTweetCount: 64,
        likeCount: 6675,
        viewCount: 233000,
        bookmarkCount: 27,
        createdOnSocialQ: false
      }),
      new Tweet ({
        body: `When me hear "they ate & left no crumbs," me think that they not eating cookies. Because me always leave lots of crumbs when eating cookies. 🍪`,
        author: cookieMonster._id,
        date: new Date('July 13, 2023, 1:33 PM EDT'),
        replyCount: 52,
        retweetCount: 824,
        quoteTweetCount: 73,
        likeCount: 5442,
        viewCount: 240000,
        bookmarkCount: 41,
        createdOnSocialQ: false
      }),
      new Tweet ({
        body: `Me love 4th of July! Me like to think that fireworks are big shinny cookies in da sky just for me. 🎆 #4thofJuly`,
        author: cookieMonster._id,
        date: new Date('July 4, 2023, 9:08 AM EDT'),
        replyCount: 23,
        retweetCount: 267,
        quoteTweetCount: 10,
        likeCount: 2357,
        viewCount: 112000,
        bookmarkCount: 9,
        createdOnSocialQ: false
      }),
      new Tweet ({
        body: `What do you think, bestie? 🤔`,
        author: cookieMonster._id,
        date: new Date('June 29, 2023, 1:12 PM EDT'),
        replyCount: 23,
        retweetCount: 267,
        quoteTweetCount: 10,
        likeCount: 2357,
        viewCount: 112000,
        bookmarkCount: 9,
        videoUrl1: 'https://socialq--seeds.s3.us-east-2.amazonaws.com/cookie+monster+crumble.mp4',
        videoDesc1: `cookie monster asking: 'if cookie crumbles in the forest, and me not there to eat it, is it still delicious?'`,
        createdOnSocialQ: false
      }),
      new Tweet({
        body: `Me just tried to bake cookies, but me got distracted by the chocolate chips. Oops! Me think me invented a new cookie invention. 🍪🍫 #BakingAdventure`,
        author: User.findOne({ firstName: 'Cookie', lastName: 'Monster' })._id,
        date: new Date(),
        replyCount: 42,
        retweetCount: 103,
        quoteTweetCount: 5,
        likeCount: 1589,
        viewCount: 78500,
        bookmarkCount: 11,
        createdOnSocialQ: true
      }),
      
      new Tweet({
        body: `Sometimes me wonder, why is it called a "computer" and not a "cookie-ter"? Me could definitely use more cookies in technology! 💻🍪 #TechThoughts`,
        author: User.findOne({ firstName: 'Cookie', lastName: 'Monster' })._id,
        date: new Date(),
        replyCount: 31,
        retweetCount: 78,
        quoteTweetCount: 2,
        likeCount: 1876,
        viewCount: 92000,
        bookmarkCount: 7,
        createdOnSocialQ: true
      }),
      
      new Tweet({
        body: `Me just discovered a hidden stash of cookies! Me always knew me had a secret cookie treasure. 🏴‍☠️🍪 #CookieAdventure`,
        author: User.findOne({ firstName: 'Cookie', lastName: 'Monster' })._id,
        date: new Date(),
        replyCount: 15,
        retweetCount: 55,
        quoteTweetCount: 3,
        likeCount: 1234,
        viewCount: 64000,
        bookmarkCount: 6,
        createdOnSocialQ: true
      }),
      
      new Tweet({
        body: `Me have a cookie strategy: eat one cookie, then eat another cookie, and then eat more cookies! Me call it "Strategic Cookie Consumption." 🍪🍪🍪 #CookieLife`,
        author: User.findOne({ firstName: 'Cookie', lastName: 'Monster' })._id,
        date: new Date(),
        replyCount: 20,
        retweetCount: 87,
        quoteTweetCount: 6,
        likeCount: 1450,
        viewCount: 76000,
        bookmarkCount: 8,
        createdOnSocialQ: true
      }),
      new Tweet({
        body: `Today me trying to set world record for most cookies eaten in one minute. Me reached three cookies before me fell asleep. Me call it "Nap Time Records." 😴🍪 #CookieChampion`,
        author: User.findOne({ firstName: 'Cookie', lastName: 'Monster' })._id,
        date: new Date(),
        replyCount: 12,
        retweetCount: 42,
        quoteTweetCount: 1,
        likeCount: 1012,
        viewCount: 58000,
        bookmarkCount: 5,
        createdOnSocialQ: true
      })
  ]
  
    return cookieMonsterTweets;
};



module.exports = createCookieMonsterTweets;