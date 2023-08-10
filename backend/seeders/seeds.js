const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const Category = require('../models/Category');
const PostCategory = require('../models/PostCategory');
const createCherTweets = require('./createCherTweets.js')
const createCookieMonsterTweets = require('./createCookieMonsterTweets.js')
const createLordVoldemortTweets = require('./createLordVoldemortTweets.js')
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker'); 

const NUM_SEED_TWEETS = 30;

// Create users
const users = [];

users.push(
  new User ({
    firstName: 'Demo',
    lastName: 'User',
    username: 'demo-user',
    twitterHandle: 'quoth_the_server_404',
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

  new User ({
    firstName: 'Lord',
    lastName: 'Voldemort',
    username: 'lord_voldemort7',
    twitterHandle: 'lord_voldemort7',
    email: 'lord@voldemort.com',
    hashedPassword: bcrypt.hashSync('starwars', 10)
  }),
)
  
// Create tweets

function getRandomDateWithinLast30Days() {
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30); // Subtract 30 days

  const randomTimestamp = pastDate.getTime() + Math.random() * (currentDate.getTime() - pastDate.getTime());

  return new Date(randomTimestamp);
}

const createDemoUserTweets = async () => {
  const demoUser = await User.findOne({ username: 'demo-user' })
  const demoUserTweets = [];

  for (let i = 0; i < NUM_SEED_TWEETS; i++) {
    const newTweet = new Tweet ({
        body: faker.hacker.phrase(),
        author: demoUser,
        date: getRandomDateWithinLast30Days()
        })
    demoUserTweets.push(newTweet)
  }
  
  return demoUserTweets;
};

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
  }),
  new Category({
    name: 'hungry'
  }),
  new Category({
    name: 'goofy'
  }),
  new Category({
    name: 'devious'
  }),
  new Category({
    name: 'calculated'
  }),
  new Category({
    name: 'clever'
  }),
  new Category({
    name: 'thoughtful'
  })
)

//create post categories

const cherCategories = [{name: 'funny'}, {name: 'witty'}, {name: 'spontaneous'}]
const cookieMonsterCategories = [{name: 'goofy'}, {name: 'hungry'}]
const lordVoldemortCategories = [{name: 'devious'}, {name: 'calculated'}, {name: 'clever'}]
const allCategories = [{name: 'funny'}, {name: 'witty'}, {name: 'thoughtful'}, {name: 'spontaneous'}, {name: 'goofy'}, {name: 'excited'}, {name: 'calculated'}, {name: 'clever'}]

function pickRandomElementsFromArray(arr, count) {
  if (count >= arr.length) {
    return arr.slice(); // Return a copy of the entire array
  }

  const shuffled = arr.slice(); // Create a copy of the array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }

  return shuffled.slice(0, count);
}

createPostCategoriesForUserTweets = async (username, userCategoryArray) => {
  const user = await User.findOne({username: username});
  const userTweets = await Tweet.find({author: user._id});
  const userCategories = await Category.find({$or: userCategoryArray});
  const postCategoriesArray = [];

  userTweets.forEach(async tweet => {
    const randomCategories = await pickRandomElementsFromArray(userCategories, Math.floor(Math.random() * 3) + 1)
    randomCategories.forEach(category => {
      const postCategory = new PostCategory({
        post: tweet._id,
        category: category._id
      });
      postCategoriesArray.push(postCategory)
    });
  });
  return postCategoriesArray
};

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

  
  const insertSeeds = async () => {
    console.log("Resetting db and seeding users and tweets...");
  
    try {
      await User.collection.drop();
      await Tweet.collection.drop();
      await PostCategory.collection.drop();
      await Category.collection.drop();
  
      await User.insertMany(users)

      const demoUserTweetsArray = await createDemoUserTweets();
      await Tweet.insertMany(demoUserTweetsArray);
      
      const cherTweetsArray = await createCherTweets();
      await Tweet.insertMany(cherTweetsArray);

      const cookieMonsterTweetsArray = await createCookieMonsterTweets();
      await Tweet.insertMany(cookieMonsterTweetsArray);

      const lordVoldemortTweetsArray = await createLordVoldemortTweets();
      await Tweet.insertMany(lordVoldemortTweetsArray);

      await Category.insertMany(categories);
  
      // Populate postCategories before inserting
      const cherPostCategories = await createPostCategoriesForUserTweets('cher', cherCategories);
      await PostCategory.insertMany(cherPostCategories);

      const cookieMonsterPostCategories = await createPostCategoriesForUserTweets('mecookiemonster', cookieMonsterCategories);
      await PostCategory.insertMany(cookieMonsterPostCategories);

      const lordVoldemortPostCategories = await createPostCategoriesForUserTweets('lord_voldemort7', lordVoldemortCategories);
      await PostCategory.insertMany(lordVoldemortPostCategories);

      const demoUserPostCategories = await createPostCategoriesForUserTweets('demo-user', allCategories);
      await PostCategory.insertMany(demoUserPostCategories);
      console.log(demoUserPostCategories)

      console.log("Done!");
    } catch (err) {
      console.error(err.stack);
      process.exit(1)
    } finally {
      mongoose.disconnect();
    }
  }