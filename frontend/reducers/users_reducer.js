import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import {
  RECEIVE_USER,
  RECEIVE_USERS,
  RECEIVE_FOLLOW,
  REMOVE_FOLLOW } from '../actions/user_actions';

import merge from 'lodash/merge';

const usersReducer = (state = {}, action) => {
  let nextState;
  let follow;
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_USERS:
      return action.users
    case RECEIVE_CURRENT_USER:
      return merge({}, state, {[action.currentUser.id]: action.currentUser});
    case RECEIVE_USER:
      return merge({}, state, {[action.user.id]: action.user});
    case RECEIVE_FOLLOW:
      nextState = merge({}, state);
      follow = action.follow;
      nextState[follow.follower_id].followingIds.push(follow.followeee_id);
      nextState[follow.followee_id].followerIds.push(follow.follower_id);
      nextState[follow.followee_id].myFollow = follow;
      return nextState;
    case REMOVE_FOLLOW:
      nextState = merge({}, state);
      follow = action.follow;
      const idx = nextState[follow.follower_id].followingIds.indexOf(follow.followee_id);
      //delete id using splice
      nextState[follow.follower_id].followingIds.splice(idx,1)
      const idx2 = nextState[follow.followee_id].followerIds.indexOf(follow.follower_id);
      nextState[follow.followee_id].followerIds.splice(idx2,1)
      nextState[follow.followee_id].follows = false;
      return nextState;
    default:
      return state;
  }
}

export default usersReducer;
