import jwtFetch from './jwt';
const RECEIVE_SUBSCRIPTIONS = "RECEIVE_SUBSCRIPTIONS";

const subscriptionsReducer = (state = { users: {}, categories: {}}, action) => {
    const newState = {...state}
    switch(action.type) {
      case RECEIVE_SUBSCRIPTIONS:
        return { ...state, users: action.subscriptions.users, categories: action.subscriptions.categories};
      default:
        return state;
    }
  };
  
  export default subscriptionsReducer;