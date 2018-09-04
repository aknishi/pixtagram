import {
  RECEIVE_POST,
  RECEIVE_POSTS,
  REMOVE_POST,
  RECEIVE_COMMENT,
  RECEIVE_LIKE,
  REMOVE_COMMENT,
  REMOVE_LIKE } from '../actions/post_actions';

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
      delete nextState[action.id];
      return nextState;
    case RECEIVE_LIKE:
      nextState = merge({}, state);
      nextState[action.like.post_id].like_count++;
      nextState[action.like.post_id].likeIds.push(action.like.id);
      return nextState;
    case REMOVE_LIKE:
      nextState = merge({}, state);
      const postId = action.like_post_id
      nextState[postId].like_count--;
      const idx = nextState[postId].likeIds.indexOf(action.like.id)
      delete nextState[postId].likeIds[idx]
      return nextState;
    case RECEIVE_COMMENT:
      nextState = merge({}, state);
      nextState[action.comment.post_id].comments[action.comment.id] = action.comment
    case REMOVE_COMMENT:
      nextState = merge({}, state);
      delete nextState[action.comment.post_id].comments[action.comment.id]
      return nextState;
    default:
      return state;
  }
}

export default postsReducer;
