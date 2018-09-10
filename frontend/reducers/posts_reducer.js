import {
  RECEIVE_POST,
  RECEIVE_POSTS,
  REMOVE_POST,
  RECEIVE_LIKE,
  REMOVE_LIKE,
  RECEIVE_BOOKMARK,
  REMOVE_BOOKMARK } from '../actions/post_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions'
import merge from 'lodash/merge';

const postsReducer = (state = {}, action) => {
  let nextState;
  let postId;
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
        postId = action.like.likeable_id
        nextState[postId].liked = true
        nextState[postId].likerIds.push(action.like.liker_id);
        nextState[postId].myLike = action.like
      }
      return nextState;
    case REMOVE_LIKE:
      nextState = merge({}, state);
      if (action.like.likeable_type === "Post") {
        postId = action.like.likeable_id
        nextState[postId].liked = false
        const idx = nextState[postId].likerIds.indexOf(action.like.liker_id)
        //delete id using splice
        nextState[postId].likerIds.splice(idx,1)
        nextState[postId].myLike = null;
      }
      return nextState;
    case RECEIVE_BOOKMARK:
      nextState = merge({}, state);
      postId = action.bookmark.post_id;
      nextState[postId].myBookmark = action.bookmark;
      nextState[postId].bookmarked = true;
      return nextState;
    case REMOVE_BOOKMARK:
      nextState = merge({}, state);
      postId = action.bookmark.post_id;
      nextState[postId].myBookmark = null;
      nextState[postId].bookmarked = false;
      return nextState;
    case RECEIVE_COMMENT:
      nextState = merge({}, state);
      nextState[action.comment.post_id].commentIds.push(action.comment.id)
      return nextState;
    case REMOVE_COMMENT:
      nextState = merge({}, state);
      const idx = nextState[action.comment.post_id].commentIds.indexOf(action.comment.id)
      //delete id using splice
      nextState[postId].commentIds.splice(idx,1)
      return nextState;
    default:
      return state;
  }
}

export default postsReducer;
