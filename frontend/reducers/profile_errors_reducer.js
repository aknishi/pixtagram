import {
  RECEIVE_PROFILE_ERRORS,
  RECEIVE_USER,
  CLEAR_PROFILE_ERRORS
} from '../actions/user_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROFILE_ERRORS:
      return action.errors;
    case CLEAR_PROFILE_ERRORS:
      return [];
    case RECEIVE_USER:
      return [];
    default:
      return state;
  }
};
