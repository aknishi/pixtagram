import {
  RECEIVE_POST,
  RECEIVE_POSTS,
  REMOVE_POST,
  RECEIVE_LIKE,
  REMOVE_LIKE } from '../actions/post_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions'
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
      if (action.like.likeable_type === "Post") {
        const postId = action.like.likeable_id
        nextState[postId].likerIds.push(action.like.liker_id);
        nextState[postId].myLike = action.like
      }
      return nextState;
    case REMOVE_LIKE:
      nextState = merge({}, state);
      if (action.like.likeable_type === "Post") {
        const postId = action.like.likeable_id
        const idx = nextState[postId].likerIds.indexOf(action.like.liker_id)
        delete nextState[postId].likerIds[idx]
        //remove empty elements in array
        nextState[postId].likerIds = nextState[postId].likerIds.filter(Number);
        nextState[postId].myLike = null;
      }
      return nextState;
    case RECEIVE_COMMENT:
      nextState = merge({}, state);
      nextState[action.comment.post_id].commentIds.push(action.comment.id)
      return nextState;
    case REMOVE_COMMENT:
      nextState = merge({}, state);
      const idx = nextState[action.comment.post_id].commentIds.indexOf(action.comment.id)
      delete nextState[postId].commentIds[idx]
      //remove empty elements in array
      nextState[postId].commentIds = nextState[postId].commentIds.filter(Number);
      return nextState;
    default:
      return state;
  }
}

export default postsReducer;
