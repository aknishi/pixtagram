import { RECEIVE_POST, RECEIVE_POSTS, REMOVE_POST } from '../actions/post_actions';

import merge from 'lodash/merge';

const postsReducer = (state = {}, action) => {
  let nextState;
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_POSTS:
      return action.posts;
    case RECEIVE_POST:
      return merge({}, state, {[action.post.id]: action.post});
    case REMOVE_POST:
      nextState = merge({}, state);
      console.log(nextState);
      delete nextState[action.id];
      return nextState;
    default:
      return state;
  }
}

export default postsReducer;
