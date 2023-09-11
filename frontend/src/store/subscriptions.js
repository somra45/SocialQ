import jwtFetch from './jwt';

export const RECEIVE_SUBSCRIPTIONS = "RECEIVE_SUBSCRIPTIONS";
// const RECEIVE_CURRENT_PAGE_SUBSCRIPTIONS = "RECEIVE_CURRENT_PAGE_SUBSCRIPTIONS";

export const receiveSubscriptions = subscriptions => ({
    type: RECEIVE_SUBSCRIPTIONS,
    subscriptions
  });

// export const receiveCurrentPageSubscriptions = subscriptions => ({
//     type: RECEIVE_CURRENT_PAGE_SUBSCRIPTIONS,
//     subscriptions
// });

const subscriptionsReducer = (state = {}, action) => {
    const newState = {...state}
    debugger
    switch(action.type) {
      case RECEIVE_SUBSCRIPTIONS:
        debugger
        return { ...newState, users: action.subscriptions.users, categories: action.subscriptions.categories};
      default:
        return newState;
    }
};

// export const currentPageSubscriptionsReducer = (state = {}, action) => {
//     const newState = {...state}
//     switch(action.type) {
//       case RECEIVE_CURRENT_PAGE_SUBSCRIPTIONS:
//         debugger
//         return { ...newState, users: action.subscriptions.users, categories: action.subscriptions.categories};
//       default:
//         return newState;
//     }
//   };

export default subscriptionsReducer