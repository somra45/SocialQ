import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { tweetErrorsReducer } from './tweets';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  tweets: tweetErrorsReducer
});

export default errorsReducer