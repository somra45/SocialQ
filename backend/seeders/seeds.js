const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const Category = require('../models/Category');
const PostCategory = require('../models/PostCategory');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker'); 
const Category = require("../models/Category.js");

const NUM_SEED_USERS = 10;
const NUM_SEED_TWEETS = 30;

// Create users
const users = [];

users.push(
  new User ({
    firstName: 'Demo',
    lastName: 'User',
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10)
  }),

  new User ({
    firstName: 'Cher',
    lastName: 'Sarkissian',
    username: 'cher',
    twitterHandle: 'cher',
    email: 'cher@cher.com',
    hashedPassword: bcrypt.hashSync('starwars', 10)
  }),

  new User ({
    firstName: 'Cookie',
    lastName: 'Monster',
    username: 'mecookiemonster',
    twitterHandle: 'mecookiemonster',
    email: 'cookie@monster.com',
    hashedPassword: bcrypt.hashSync('starwars', 10)
  }),

  new User ({
    firstName: 'Neil',
    lastName: 'Patel',
    username: 'neilpatel',
    twitterHandle: 'neilpatel',
    email: 'neil@patel.com',
    hashedPassword: bcrypt.hashSync('starwars', 10)
  }),

  // new User ({
  //   firstName: 'Wendy',
  //   lastName: 'Thomas',
  //   username: 'wendys',
  //   twitterHandle: 'wendys',
  //   email: 'wendy@thomas.com',
  //   hashedPassword: bcrypt.hashSync('starwars', 10)
  // }),

  new User ({
    firstName: 'Lord',
    lastName: 'Voldemort',
    username: 'lord_voldemort7',
    twitterHandle: 'lord_voldemort7',
    email: 'lord@voldemort.com',
    hashedPassword: bcrypt.hashSync('starwars', 10)
  }),
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User ({
      firstName: firstName,
      lastName: lastName,
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
    })
  )
}
  
// Create tweets
const tweets = [];

tweets.push(
  
  //Cher tweets
  new Tweet ({
      body: `I’M SO +%#~>€ EXCITED ABOUT MY 🎅🏼🎄ALBUM. NEVER WANTED 2 DO ONE, BUT ITS AS GOOD AS ANY RECORD IVE MADE. THIS IS NOT UR”MOTHERS 🎅🏽🎄🎅🏼ALBUM”`,
      author: User.findOne({firstName: 'Cher', lastName: 'Sarkissian'})._id,
      date: new Date('July 31, 2023, 12:47 AM EDT'),
      replyCount: 410,
      retweetCount: 1282,
      quoteTweetCount: 290,
      likeCount: 15300,
      viewCount: 815000,
      bookmarkCount: 71,
      createdOnSocialQ: false
    }),
  new Tweet ({
    body: `I’ve searched  for the perfect ice cream all over the🌎.I  finally found My Dream Ice cream In New Zealand,& Im More Than Thrilled  To Bring It Home to you CHER~lato Giappo is Wizzard who creates Heaven on a cone`,
    author: User.findOne({firstName: 'Cher', lastName: 'Sarkissian'})._id,
    date: new Date('July 28, 2023, 2:52 PM EDT'),
    replyCount: 226,
    retweetCount: 362,
    quoteTweetCount: 102,
    likeCount: 4541,
    viewCount: 365000,
    bookmarkCount: 45,
    createdOnSocialQ: false
    // https://twitter.com/cher/status/1685000252737126401?s=46&t=UnVuFeW1zKTGCMWm9lPONw
  }),
  new Tweet ({
    body: `Many Surprises.
    This is Cher 🎄🎅🏽Album.
    Not Ur Mamas 🎄🎅🏽.
    It’s scary to make something 
    so Different . I 💚🩷it,
    One Som is one of favorites
    EVER‼️‼️‼️`,
    author: User.findOne({firstName: 'Cher', lastName: 'Sarkissian'})._id,
    date: new Date('June 30, 2023, 4:51 PM EDT'),
    photoUrl1: 'https://pbs.twimg.com/media/F2JSzA7WYAAMkPQ?format=jpg&name=small',
    photoDesc1: "bus with cher's image on the side that says Cherlato on it",
    photoUrl2: 'https://pbs.twimg.com/media/F2JSzAzXQAEQ1AF?format=jpg&name=360x360',
    photoDesc2: 'gelato with colorful toppings in a cone',
    photoUrl3: 'https://pbs.twimg.com/media/F2JSzA7XAAUujYF?format=jpg&name=360x360',
    photoDesc3: 'chocolate gelato with crunchy topping in a cone',
    replyCount: 364,
    retweetCount: 607,
    quoteTweetCount: 193,
    likeCount: 4578,
    viewCount: 326000,
    bookmarkCount: 30,
    createdOnSocialQ: false
  }),
  new Tweet ({
    body: `Available Now:bangbang: Cher’s It’s a Man’s World (Deluxe Edition) - This Limited-Edition LP Box Contains The Remastered Record & Rare Remixes – Both For The First Time On Red, Blue, Green & Yellow Vinyl Plus Two Exclusive, Numbered Lithographs
    http://lnk.to/itsamansworld
    🍎🐍✨`,
    author: User.findOne({firstName: 'Cher', lastName: 'Sarkissian'})._id,
    date: new Date('July 14, 2023, 2:40 PM EDT'),
    replyCount: 145,
    retweetCount: 241,
    quoteTweetCount: 54,
    likeCount: 1506,
    viewCount: 116300,
    bookmarkCount: 16,
    videoUrl1: 'https://twitter.com/i/status/1679894982533033992', // need to edit
    videoDesc1: `flipping through pages of Cher's book`,
    createdOnSocialQ: false
  }),
  new Tweet ({
    body: `Listen To “Paradise Is Here (Sunrise Mix)” From The Forthcoming Deluxe Edition of ‘It’s a Man’s World.’ Available For The First Time On Vinyl 7/14 :bangbang:
    https://lnk.to/pihsm
    🩷`,
    author: User.findOne({firstName: 'Cher', lastName: 'Sarkissian'})._id,
    date: new Date('July 12, 2023, 4:40 PM EDT'),
    replyCount: 120,
    retweetCount: 199,
    quoteTweetCount: 28,
    likeCount: 1578,
    viewCount: 105500,
    bookmarkCount: 19,
    videoUrl1: 'https://twitter.com/i/status/1679894982533033992', // need to edit
    videoDesc1: `cover of cher's single Paradise is Here while track plays`,
    createdOnSocialQ: false
  }),
  new Tweet ({
    body: `Ok,Will Someone 🙏🏼PLEASE
    Tell me…..When Will I Feel
    OLD👶🏻.This is ridiculous🙄. I keep hearing these numbers,but I Honestly can’t understand them.
    WHATS THE DEAL WITH #’s⁉️
    I’m dyslexic & #’s Are hard 4 me.
    
    Thank u for staying, I know it’s been hard.
    
    Got to go work out.
    Twitter is harder for me than 
    TweetBot.`,
    author: User.findOne({firstName: 'Cher', lastName: 'Sarkissian'})._id,
    date: new Date('May 20, 2023, 1:40 PM EDT'),
    replyCount: 2421,
    retweetCount: 1420,
    quoteTweetCount: 280,
    likeCount: 18800,
    viewCount: 1300000,
    bookmarkCount: 134,
    createdOnSocialQ: false
  }),
  new Tweet ({
    body: `1st Of All There Is No excuse for my Behavior,Talk To Me, Vent Your Sadness,Frustration,
    Disappointment,& Anger…`,
    author: User.findOne({firstName: 'Cher', lastName: 'Sarkissian'})._id,
    date: new Date('March 19, 2023, 8:24 PM EDT'),
    replyCount: 1036,
    retweetCount: 361,
    quoteTweetCount: 102,
    likeCount: 4095,
    viewCount: 893000,
    bookmarkCount: 45,
    createdOnSocialQ: false
  }),
  new Tweet ({
    body: `Doing Vinyl 2`,
    author: User.findOne({firstName: 'Cher', lastName: 'Sarkissian'})._id,
    date: new Date('June 30, 2023, 8:24 PM EDT'),
    replyCount: 199,
    retweetCount: 123,
    quoteTweetCount: 25,
    likeCount: 1751,
    viewCount: 126400,
    bookmarkCount: 7,
    createdOnSocialQ: false
  }),
  new Tweet ({
    body: `Listen to “One by One (JR’s Pride Mix)” From The Forthcoming Deluxe Edition of ‘It’s a Man’s World.’ Available For The First Time On Vinyl From 7/14 - https://lnk.to/cobo
    🔥
    #OneByOne #DeluxeEdition #VinylRelease #MusicMagic #WarnerRecords`,
    author: User.findOne({firstName: 'Cher', lastName: 'Sarkissian'})._id,
    date: new Date('June 29, 2023, 8:24 PM EDT'),
    replyCount: 148,
    retweetCount: 197,
    quoteTweetCount: 15,
    likeCount: 1416,
    viewCount: 105300,
    bookmarkCount: 9,
    videoUrl1: '', // need to edit
    videoDesc1: `still of Cher's One by One single while track plays in background`,
    createdOnSocialQ: false
  }),


  //Cookie Monster tweets
  new Tweet ({
    body: `Have you om nom nom nomed today?`,
    author: User.findOne({firstName: 'Cookie', lastName: 'Monster'})._id,
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
    author: User.findOne({firstName: 'Cookie', lastName: 'Monster'})._id,
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
    author: User.findOne({firstName: 'Cookie', lastName: 'Monster'})._id,
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
    author: User.findOne({firstName: 'Cookie', lastName: 'Monster'})._id,
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
    author: User.findOne({firstName: 'Cookie', lastName: 'Monster'})._id,
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
    author: User.findOne({firstName: 'Cookie', lastName: 'Monster'})._id,
    date: new Date('June 29, 2023, 1:12 PM EDT'),
    replyCount: 23,
    retweetCount: 267,
    quoteTweetCount: 10,
    likeCount: 2357,
    viewCount: 112000,
    bookmarkCount: 9,
    videoUrl1: '', //need to edit
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
  }),

  //Lord Voldemort tweets
  new Tweet ({
    body: `"I rose up from the dead, I do it all the time" @taylorswift13 #snakes`,
    author: User.findOne({firstName: 'Lord', lastName: 'Voldemort'})._id,
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
    author: User.findOne({firstName: 'Lord', lastName: 'Voldemort'})._id,
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
    author: User.findOne({firstName: 'Lord', lastName: 'Voldemort'})._id,
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
    author: User.findOne({firstName: 'Lord', lastName: 'Voldemort'})._id,
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
    author: User.findOne({firstName: 'Lord', lastName: 'Voldemort'})._id,
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
  }),
)

for (let i = 0; i < NUM_SEED_TWEETS; i++) {
  tweets.push(
    new Tweet ({
      body: faker.hacker.phrase(),
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      date: new Date()
    })
  )
}

//create categories
const categories = []

categories.push(
  new Category({
    name: 'spontaneous'
  }),
  new Category({
    name: 'witty'
  }),
  new Category({
    name: 'playful'
  }),
  new Category({
    name: 'excited'
  })
)

//create post categories
const postCategories = []

postCategories.push(
  new PostCategory()
)

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

  const insertSeeds = () => {
    console.log("Resetting db and seeding users and tweets...");
  
    User.collection.drop()
                   .then(() => Tweet.collection.drop())
                   .then(() => PostCategory.collection.drop())
                   .then(() => Category.collection.drop())
                   .then(() => User.insertMany(users))
                   .then(() => Tweet.insertMany(tweets))
                   .then(() => Category.insertMany(categories))
                   .then(() => {
                     console.log("Done!");
                     mongoose.disconnect();
                   })
                   .catch(err => {
                     console.error(err.stack);
                     process.exit(1);
                   });
  }