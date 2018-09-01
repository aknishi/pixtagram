import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  START_LOADING_POSTS,
  START_LOADING_POST
} from '../actions/post_actions';

const initialState = {
  indexLoading: false
};

const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POSTS:
      return Object.assign({}, state, { indexLoading: false });
    case RECEIVE_POST:
      return Object.assign({}, state, { indexLoading: false });
    case START_LOADING_POSTS:
      return Object.assign({}, state, { indexLoading: true });
    case START_LOADING_POST:
      return Object.assign({}, state, { indexLoading: true });
    default:
      return state;
  }
};

export default loadingReducer;
