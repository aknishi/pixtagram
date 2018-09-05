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
        nextState[postId].likeIds.push(action.like.id);
        nextState[postId].myLike = action.like
      }
      return nextState;
    case REMOVE_LIKE:
      nextState = merge({}, state);
      if (action.like.likeable_type === "Post") {
        const postId = action.like.likeable_id
        const idx = nextState[postId].likeIds.indexOf(action.like.id)
        delete nextState[postId].likeIds[idx]
        //remove empty elements in array
        nextState[postId].likeIds = nextState[postId].likeIds.filter(Number);
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
      nextState[postId].likeIds = nextState[postId].commentIds.filter(Number);
      return nextState;
    default:
      return state;
  }
}

export default postsReducer;
