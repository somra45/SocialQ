import jwtFetch from "./jwt";

const RECEIVE_AI_BODY = "aiBody/RECEIVE_AI_BODY"
const RECEIVE_AI_BODY_ERRORS = "aiBody/RECEIVE_AI_BODY_ERRORS";



export const receiveAIBody = aiBody => ({
    type: RECEIVE_AI_BODY,
    aiBody
});

const receiveErrors = errors => ({
    type: RECEIVE_AI_BODY_ERRORS,
    errors
});

export const fetchGeneration = (instructions) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/aiFetch`, {
            method: "POST",
            body: JSON.stringify({"instructions": instructions})
        })
        const aiBody = await res.json();
        debugger
        dispatch(receiveAIBody(aiBody));
      } catch (err) {
        debugger
        // const resBody = await err.json();
        // if (resBody.statusCode === 400) {
        //   dispatch(receiveErrors(resBody.errors));
        // }
      }
}

export const aiBodyErrorsReducer = (state = {}, action) => {
    switch(action.type) {
      case RECEIVE_AI_BODY_ERRORS:
        return action.errors;
      default:
        return state;
    }
};

const aiBodyReducer = (state = {}, action) => {
    switch(action.type) {
      case RECEIVE_AI_BODY:
        return { ...state, aiBody: action.aiBody }
      default:
        return state;
    }
  };
  
  export default aiBodyReducer;