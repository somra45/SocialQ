
const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const csurf = require('csurf');
const debug = require('debug');
require('./models/User');
require('./models/Tweet');
require('./models/PostCategory');
require('./models/Subscription');
require('./config/passport');
const passport = require('passport');

const cors = require('cors');
const { isProduction } = require('./config/keys');

const usersRouter = require('./routes/api/users');
const tweetsRouter = require('./routes/api/tweets');
const postCategoriesRouter = require('./routes/api/postCategories');
// const subscriptionsRouter = require('./routes/api/subscriptions') DO WE NEED THIS?
const csrfRouter = require('./routes/api/csrf');

const app = express();

app.use(logger('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()); 
app.use(passport.initialize());

if (!isProduction) {
    app.use(cors());
}

app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

app.use('/api/users', usersRouter);
app.use('/api/tweets', tweetsRouter);
app.use('/api/postCategories', postCategoriesRouter);
// app.use('/api/subscriptions', subscriptionsRouter); NEEDED?
app.use('/api/csrf', csrfRouter);

// Express custom middleware for catching all unmatched requests and formatting
// a 404 error to be sent as the response.
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
  });
  
  const serverErrorLogger = debug('backend:error');
  
  // Express custom error handler that will be called whenever a route handler or
  // middleware throws an error or invokes the `next` function with a truthy value
  app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      statusCode,
      errors: err.errors
    })
  });

module.exports = app;