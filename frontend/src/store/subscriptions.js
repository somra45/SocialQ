import jwtFetch from './jwt';

const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
  });


// export const receiveCurrentPageSubscriptions = subscriptions => ({
//     type: RECEIVE_CURRENT_PAGE_SUBSCRIPTIONS,
//     subscriptions
// });

// const subscriptionsReducer = (state = {}, action) => {
//     const newState = {...state}
//     debugger
//     switch(action.type) {
//       case RECEIVE_SUBSCRIPTIONS:
//         debugger
//         return { ...newState, users: action.subscriptions.users, categories: action.subscriptions.categories};
//       default:
//         return newState;
//     }
// };

export const subscribeToUser = username => async dispatch => {
    try {
      const res = await jwtFetch(`/api/subscriptions/userSubscriptions/${username}`, {
        method: 'POST'
      });
      const updatedUser = await res.json();

      debugger
      dispatch(receiveCurrentUser(updatedUser));
      
    } catch(err) {
      console.log(err)
    //   const resBody = await err.json();
    //   if (resBody.statusCode === 400) {
    //     return dispatch(receiveErrors(resBody.errors));
    //   }
    }
};

export const unsubscribeFromUser = username => async dispatch => {
    try {

      const res = await jwtFetch(`/api/subscriptions/userSubscriptions/${username}`, {
        method: 'DELETE'
      });
      debugger
      const updatedUser = await res.json();
      debugger
      dispatch(receiveCurrentUser(updatedUser));
      // dispatch(receiveCurrentPageSubscriptions(currentPageSubscriptions))
    } catch(err) {
    //   const resBody = await err.json();
      console.log(err)
    //   if (resBody.statusCode === 400) {
    //     return dispatch(receiveErrors(resBody.errors));
    //   }
    }
};

export const subscribeToCategory = categoryName => async dispatch => {
    try {
      const res = await jwtFetch(`/api/subscriptions/categorySubscriptions/${categoryName}`, {
        method: 'POST'
      });
      const updatedUser = await res.json();
      dispatch(receiveCurrentUser(updatedUser));
      
    } catch(err) {
      console.log(err)
      // const resBody = await err.json();
      // if (resBody.statusCode === 400) {
      //   return dispatch(receiveErrors(resBody.errors));
      // }
    }
};

export const unsubscribeFromCategory = categoryName => async dispatch => {
    try {

      const res = await jwtFetch(`/api/subscriptions/categorySubscriptions/${categoryName}`, {
        method: 'DELETE'
      });
      const updatedUser = await res.json();
      dispatch(receiveCurrentUser(updatedUser));
      // dispatch(receiveCurrentPageSubscriptions(currentPageSubscriptions))
    } catch(err) {
    //   const resBody = await err.json();
      console.log(err)
    //   if (resBody.statusCode === 400) {
    //     return dispatch(receiveErrors(resBody.errors));
    //   }
    }
};