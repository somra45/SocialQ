import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { tweetErrorsReducer } from './tweets';
import { aiBodyErrorsReducer } from './aiBody';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  tweets: tweetErrorsReducer,
  aiBody: aiBodyErrorsReducer
});

export default errorsReducer