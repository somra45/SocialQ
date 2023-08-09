const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker'); 

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
    replyCount: 364,
    retweetCount: 607,
    quoteTweetCount: 193,
    likeCount: 4578,
    viewCount: 326000,
    bookmarkCount: 30,
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
  })
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
                   .then(() => {
                     console.log("Done!");
                     mongoose.disconnect();
                   })
                   .catch(err => {
                     console.error(err.stack);
                     process.exit(1);
                   });
  }