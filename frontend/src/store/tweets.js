import jwtFetch from './jwt';

import { RECEIVE_USER_LOGOUT } from './session';
// import receiveSubscriptions from './subscriptions';

const RECEIVE_TWEETS = "tweets/RECEIVE_TWEETS";
const RECEIVE_USER_TWEETS = "tweets/RECEIVE_USER_TWEETS";
const RECEIVE_NEW_TWEET = "tweets/RECEIVE_NEW_TWEET";
const RECEIVE_UPDATED_TWEET = 'tweets/RECEIVE_UPDATED_TWEET'
const REMOVE_TWEET = 'tweets/REMOVE_TWEET';
const RECEIVE_CATEGORY_TWEETS = 'tweets/RECEIVE_CATEGORY_TWEETS'
const RECEIVE_TWEET_ERRORS = "tweets/RECEIVE_TWEET_ERRORS";
const CLEAR_TWEET_ERRORS = "tweets/CLEAR_TWEET_ERRORS";



const receiveTweets = tweets => ({
  type: RECEIVE_TWEETS,
  tweets
});

const receiveUserTweets = tweets => ({
  type: RECEIVE_USER_TWEETS,
  tweets
});

const receiveCategoryTweets = tweets => ({
  type: RECEIVE_CATEGORY_TWEETS,
  tweets
})

const receiveNewTweet = tweet => ({
  type: RECEIVE_NEW_TWEET,
  tweet
});

const receiveErrors = errors => ({
  type: RECEIVE_TWEET_ERRORS,
  errors
});

const receiveUpdatedTweet = tweet => ({
  type: RECEIVE_UPDATED_TWEET,
  tweet
})

const removeTweet = tweetId => ({
  type: REMOVE_TWEET,
  tweetId
})

export const clearTweetErrors = errors => ({
    type: CLEAR_TWEET_ERRORS,
    errors
});

export const getTweet = (tweetId) => state => {
  return state.tweets ? state.tweets.user[tweetId] : null
}



export const fetchTweets = () => async dispatch => {
    try {
      const res = await jwtFetch('/api/tweets');
      const tweets = await res.json();
      dispatch(receiveTweets(tweets));
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
      }
    }
  };
  
  export const fetchUserTweets = id => async dispatch => {
    try {
      debugger
      const res = await jwtFetch(`/api/tweets/user/${id}`);
      // const {tweets,subscriptions} = await res.json();
      const {tweets} = await res.json();
      dispatch(receiveUserTweets(tweets));
      // dispatch(receiveCurrentPageSubscriptions(currentPageSubscriptions))
    } catch(err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const fetchCategoryTweets = categoryName => async dispatch => {
    try {
      const res = await jwtFetch(`/api/postCategories/${categoryName}`);
      const tweets = await res.json();
      debugger
      dispatch(receiveCategoryTweets(tweets));
    } catch(err) {
      console.log(err)
    }
  }
  
  export const composeTweet = data => async dispatch => {
    const formData = new FormData();
    formData.append("body", data.body);
    formData.append("date", data.date);
    formData.append("newTweetCategories", data.categories);
    Array.from(data.images).forEach(image => formData.append("images", image));
    try {
      const res = await jwtFetch('/api/tweets/', {
        method: 'POST',
        body: formData
      });
      const tweet = await res.json();
      debugger
      dispatch(receiveNewTweet(tweet));
    } catch(err) {
      debugger
      console.log(err)
      // const resBody = await err.json();
      // if (resBody.statusCode === 400) {
      //   return dispatch(receiveErrors(resBody.errors));
      // }
    }
  };

  export const updateTweet = updatedTweet => async dispatch => {
    try {
      const res = await jwtFetch(`/api/tweets/${updatedTweet._id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTweet)
      });
      const tweet = await res.json();
      dispatch(receiveUpdatedTweet(tweet));
    } catch(err) {
      // TypeError: Cannot read properties of undefined (reading 'user')
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  }

  export const deleteTweet = tweetId => async dispatch => {
    try {
      const res = await jwtFetch(`/api/tweets/${tweetId}`, {
        method: 'DELETE'
      });
      const response = await res.json();

      dispatch(removeTweet(response.tweetId));
      return response.message
    } catch(err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  
const nullErrors = null;

export const tweetErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_TWEET_ERRORS:
      return action.errors;
    case RECEIVE_NEW_TWEET:
    case CLEAR_TWEET_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const tweetsReducer = (state = { all: {}, user: {}, category: {} }, action) => {
    const newState = {...state}
    switch(action.type) {
      case RECEIVE_TWEETS:
        return { ...state, subscribed: action.tweets.subscribed, user: action.tweets.user};
      case RECEIVE_USER_TWEETS:
        return { ...state, subscribed: action.tweets.subscribed, user: action.tweets.user};
      case RECEIVE_CATEGORY_TWEETS:
        debugger
        return {...state, category: action.tweets}
      case RECEIVE_NEW_TWEET:
        // return { ...state, new: action.tweet};
        debugger
        // newState.tweets.new = action.tweet;
        newState.user[action.tweet._id] = action.tweet;
        newState.all[action.tweet._id] = action.tweet;
        return newState
      case RECEIVE_UPDATED_TWEET:
        newState.user[action.tweet._id] = action.tweet
        newState.all[action.tweet._id] = action.tweet
        return newState
      case REMOVE_TWEET:
          delete newState.user[action.tweetId]
          delete newState.all[action.tweetId]
          return newState
      case RECEIVE_USER_LOGOUT:
        return { ...state, user: {} }
      default:
        return state;
    }
  };
  
  export default tweetsReducer;