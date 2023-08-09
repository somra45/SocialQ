const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
console.log ({mongoURI: db})
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const Category = require('../models/Category');
const PostCategory = require('../models/PostCategory');
const createCherTweets = require('./createCherTweets.js')
const createCookieMonsterTweets = require('./createCookieMonsterTweets.js')
const createLordVoldemortTweets = require('./createLordVoldemortTweets.js')
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
  })
)

//create post categories
const postCategories = []

const cher = {firstName: 'Cher', lastName: 'Sarkissian'}
const cookieMonster = {firstname: 'Cookie', lastName: 'Monster'}
const lordVoldemort = {firstName: 'Lord', lastName: 'Voldemort'}

const cherCategories = [{name: 'funny'}, {name: 'witty'}, {name: 'spontaneous'}]
const cookieMonsterCategories = [{name: 'goofy'}, {name: 'hungry'}]
const lordVoldemortCategories = [{name: 'devious'}, {name: 'calculated'}, {name: 'clever'}]

createPostCategoriesForUserTweets = async (user, userCategoryArray) => {
  const userTweets = await Tweet.find({author: User.findOne({firstName: user.firstName, lastName: user.lastName})._id}).exec()
  const userCategories = await Category.find({$or: userCategoryArray}).exec()
  
  userTweets.forEach(tweet => {
    userCategories.forEach(category => {
      const postCategory = new PostCategory({
        post: tweet._id,
        category: category._id
      });
      postCategories.push(postCategory)
    });
  });
};

// createPostCategoriesForUserTweets(cher,cherCategories)
// createPostCategoriesForUserTweets(cookieMonster,cookieMonsterCategories)
// createPostCategoriesForUserTweets(lordVoldemort,lordVoldemortCategories)

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
      
      const cherTweetsArray = await createCherTweets();
      await Tweet.insertMany(cherTweetsArray);

      const cookieMonsterTweetsArray = await createCookieMonsterTweets();
      await Tweet.insertMany(cookieMonsterTweetsArray);

      const lordVoldemortTweetsArray = await createLordVoldemortTweets();
      await Tweet.insertMany(lordVoldemortTweetsArray);

      await Category.insertMany(categories);
  
      // Populate postCategories before inserting
      await createPostCategoriesForUserTweets(cher, cherCategories);
      await createPostCategoriesForUserTweets(cookieMonster, cookieMonsterCategories);
      await createPostCategoriesForUserTweets(lordVoldemort, lordVoldemortCategories);
      await PostCategory.insertMany(postCategories);
      console.log("Done!");
    } catch (err) {
      console.error(err.stack);
      process.exit(1)
    } finally {
      mongoose.disconnect();
    }
  }