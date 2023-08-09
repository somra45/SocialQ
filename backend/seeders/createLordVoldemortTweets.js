const User = require('../models/User');
const Tweet = require('../models/Tweet');

const createLordVoldemortTweets = async () => {
  const lordVoldemort = await User.findOne({ firstName: 'Lord', lastName: 'Voldemort' });

  const lordVoldemortTweets = [
    new Tweet ({
        body: `"I rose up from the dead, I do it all the time" @taylorswift13 #snakes`,
        author: lordVoldemort._id,
        date: new Date('August 25, 2022, 6:59 PM EDT'),
        replyCount: 41,
        retweetCount: 920,
        quoteTweetCount: 69,
        likeCount: 2802,
        bookmarkCount: 2,
        createdOnSocialQ: false
        //add gif of voldemort laughing? https://twitter.com/lord_voldemort7/status/901217559860703234?s=46&t=UnVuFeW1zKTGCMWm9lPONw
      }),
      new Tweet ({
        body: `Time to find some fantastic beasts.`,
        author: lordVoldemort._id,
        date: new Date('November 17, 2022, 12:16 PM EDT'),
        replyCount: 15,
        retweetCount: 1108,
        quoteTweetCount: 30,
        likeCount: 2416,
        bookmarkCount: 1,
        createdOnSocialQ: false
      }),
      new Tweet ({
        body: `Trump supports Dolores Umbridge. Pass it on. #DebateNight #HarryPotter`,
        author: lordVoldemort._id,
        date: new Date('September 26, 2022, 10:30 PM EDT'),
        replyCount: 51,
        retweetCount: 4921,
        quoteTweetCount: 173,
        likeCount: 5507,
        bookmarkCount: 1,
        createdOnSocialQ: false
      }),
      new Tweet ({
        body: `Muggle-borns at Hogwarts will probably walk into care of magical creatures and start throwing pokeballs.`,
        author: lordVoldemort._id,
        date: new Date('July 17, 2022, 4:04 PM EDT'),
        replyCount: 4,
        retweetCount: 1876,
        quoteTweetCount: 80,
        likeCount: 2909,
        bookmarkCount: 2,
        createdOnSocialQ: false
      }),
      new Tweet ({
        body: `There is about to be a Dark Mark above the stadium because Beyonce just killed.`,
        author: lordVoldemort._id,
        date: new Date('August 4, 2022, 10:22 PM EDT'),
        replyCount: 4,
        retweetCount: 1143,
        quoteTweetCount: 1,
        likeCount: 1719,
        createdOnSocialQ: false
      }),
      new Tweet({
        body: `Plans for world domination? Completed it, mate.`,
        author: User.findOne({ firstName: 'Lord', lastName: 'Voldemort' })._id,
        date: new Date('October 10, 2022, 9:45 AM EDT'),
        replyCount: 29,
        retweetCount: 850,
        quoteTweetCount: 37,
        likeCount: 3286,
        bookmarkCount: 1,
        createdOnSocialQ: false
      }),
      
      new Tweet({
        body: `Just had a lovely stroll through the Forbidden Forest. Met a couple of Acromantulas and a unicorn. #MagicalDay`,
        author: User.findOne({ firstName: 'Lord', lastName: 'Voldemort' })._id,
        date: new Date('December 5, 2022, 3:12 PM EDT'),
        replyCount: 12,
        retweetCount: 622,
        quoteTweetCount: 12,
        likeCount: 1840,
        bookmarkCount: 2,
        createdOnSocialQ: false
      }),
      
      new Tweet({
        body: `Remember, I didn't choose the Dark Lord life. The Dark Lord life chose me.`,
        author: User.findOne({ firstName: 'Lord', lastName: 'Voldemort' })._id,
        date: new Date('January 21, 2023, 7:30 AM EDT'),
        replyCount: 38,
        retweetCount: 1065,
        quoteTweetCount: 45,
        likeCount: 4123,
        bookmarkCount: 3,
        createdOnSocialQ: false
      }),
      
      new Tweet({
        body: `Found this cool book on horcruxes. It's like a DIY guide to immortality. #LifeHacks`,
        author: User.findOne({ firstName: 'Lord', lastName: 'Voldemort' })._id,
        date: new Date('April 8, 2023, 11:58 AM EDT'),
        replyCount: 27,
        retweetCount: 732,
        quoteTweetCount: 19,
        likeCount: 2751,
        bookmarkCount: 2,
        createdOnSocialQ: false
      }),
      
      new Tweet({
        body: `When you're about to take over the wizarding world but your favorite show drops a new season on Netflix. Decisions, decisions. 📺🔮`,
        author: User.findOne({ firstName: 'Lord', lastName: 'Voldemort' })._id,
        date: new Date('May 30, 2023, 6:05 PM EDT'),
        replyCount: 16,
        retweetCount: 586,
        quoteTweetCount: 28,
        likeCount: 2154,
        bookmarkCount: 1,
        createdOnSocialQ: false
      })
  ]
  
    return lordVoldemortTweets;
};



module.exports = createLordVoldemortTweets;